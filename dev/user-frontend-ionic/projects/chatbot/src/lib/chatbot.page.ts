/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { ChatbotModuleConfig, CHATBOT_CONFIG } from './chatbot.config';
import { ChatbotMessage, ChatButton, Message, MessageType, UserMessage } from './chatbot.dto';
import { ChatbotService } from './chatbot.service';
import { UserIdGeneratorService } from './user-id-generator.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['../../../../src/theme/app-theme/chatbot/chatbot.page.scss'],
})
export class ChatbotPage implements OnInit {

  private static readonly userChatId: string = UserIdGeneratorService.initRandomUserId();

  @ViewChild('scrollContent') scrollContent: IonContent;
  @ViewChild('messages', { read: ElementRef }) domMessageList: ElementRef;

  public messageType = MessageType;
  public messages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  public userInput = '';
  public isLoading = true;
  public isFetchingAnswer = false;
  private messages: Message[] = [];
  private domMessageListObserver: MutationObserver;

  constructor(
    @Inject(CHATBOT_CONFIG) private config: ChatbotModuleConfig,
    private chatbotService: ChatbotService
  ) { }

  ngOnInit() {
    this.chatbotService.textRequest('Hello', ChatbotPage.userChatId)
      .pipe(take(1), finalize(() => this.isLoading = false))
      .subscribe((chatBotResponse) => {
          this.addMessageToChat(chatBotResponse);
        }
      );
  }

  ionViewDidEnter() {
    this.domMessageListObserver = new MutationObserver(() => {
      window.requestAnimationFrame(() => {
        this.scrollContent.scrollToBottom(500);
      });
    });
    this.domMessageListObserver.observe(this.domMessageList.nativeElement, { childList: true, subtree: true });

    if (Capacitor.isNativePlatform()) {
      Keyboard.addListener('keyboardWillShow', () => {
        this.scrollContent.scrollToBottom(0);
      });
    }
  }

  ionViewWillLeave() {
    this.domMessageListObserver.disconnect();
    if (Capacitor.isNativePlatform()) {
      Keyboard.removeAllListeners();
    }
  }

  textRequest(text: string): void {
    if(!text) {
      return;
    }

    const newUserMessage: UserMessage = { text, messageType: MessageType.user };
    this.addMessageToChat(newUserMessage);

    this.isFetchingAnswer = true;
    this.chatbotService.textRequest(text, ChatbotPage.userChatId)
      .pipe(
        take(1),
        finalize(() => this.isFetchingAnswer = false)
      ).subscribe((chatbotResponses: ChatbotMessage[]) => {
        this.addMessageToChat(chatbotResponses);
        this.userInput = '';
      });
  }

  buttonRequest(buttonTitle: string, buttonPayload: string): void {
    const newMessage: UserMessage = { text: buttonTitle, messageType: MessageType.user };
    this.addMessageToChat(newMessage);

    this.isFetchingAnswer = true;
    this.chatbotService.buttonPayloadRequest(buttonPayload, ChatbotPage.userChatId)
      .pipe(
        take(1),
        finalize(() => this.isFetchingAnswer = false)
      ).subscribe((chatbotResponses: ChatbotMessage[]) => {
        this.addMessageToChat(chatbotResponses);
        this.userInput = '';
      });
  }

  onMessageInputEnter() {
    this.textRequest(this.userInput);
  }

  onButtonClick(button: ChatButton) {
    if (button.payload) {
      this.buttonRequest(button.title, button.payload);
    } else {
      this.textRequest(button.title);
    }
  }

  addMessageToChat(messages: ChatbotMessage[] | UserMessage): void {
    if (Array.isArray(messages)) {
      this.messages.push(...messages);
    } else {
      this.messages.push(messages);
    }
    this.messages$.next(this.messages);
  }

  clearUserInput() {
    this.userInput = '';
  }

  isChatbotLogo(message: ChatbotMessage) {
    return message?.card?.file?.type === 'image'
      && message?.card?.file?.name.match(this.config.chatbotLogoRegex);
  }
}

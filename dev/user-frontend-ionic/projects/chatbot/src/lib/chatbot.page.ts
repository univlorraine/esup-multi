import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { ChatbotMessage, ChatButton, Message, MessageType, UserMessage } from './chatbot.dto';
import { ChatbotService } from './chatbot.service';
import { UserIdGeneratorService } from './user-id-generator.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
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

  constructor(private chatbotService: ChatbotService) { }

  ngOnInit() {
    this.chatbotService.textRequest('Hello', ChatbotPage.userChatId)
      .pipe(first(), finalize(() => this.isLoading = false))
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
      Keyboard.addListener('keyboardWillShow', info => {
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
        first(),
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
        first(),
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
}

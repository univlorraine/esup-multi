module.exports.chatbotData = {
    "responses": [
        {
            "type": "WebMessage",
            "card": {
                "file": {
                    "url": "http://localhost:3099/robot.jpg",
                    "name": "_nono6.png",
                    "type": "image"
                },
                "buttons": []
            },
            "version": "1"
        },
        {
            "type": "WebMessage",
            "text": "Bonjour, je suis Nono le robot et je suis là pour vous aider.",
            "version": "1"
        },
        {
            "type": "WebMessage",
            "text": "Comment puis-je vous aider ?",
            "buttons": [
                {
                    "clazz": "quick_reply",
                    "title": "J'ai un problème avec mon compte",
                    "style": "primary",
                    "type": "quick_reply"
                }
            ],
            "version": "1"
        }
    ],
    "metadata": {
        "INTENT": "bonjour"
    }
};
function init() {

    new Vue({
    
        el: '#app',
        data: {
            contacts: [
                {
                    name: 'Michele',
                    avatar: 'img/avatar1.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: 'img/avatar2.png',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: 'img/avatar3.png',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: 'img/avatar4.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],
            toDisplay: [],
            isFocused: false,
            listItem: []
        },
        methods: {

            getMessages: function(index) {

                this.toDisplay = []
                let numOfMessages = this.contacts[index].messages.length
                this.listItem = document.getElementsByTagName('li')
                
                for (i=0; i<this.listItem.length; i++){

                    this.listItem[i].setAttribute('style', 'color: #000;background-color: #fff;')
                }

                for (i=0; i<numOfMessages; i++){
                    let msg = this.contacts[index].messages[i].text
                    let status = this.contacts[index].messages[i].status
                    this.toDisplay.push({ msg, status})
                };              
                this.listItem[index].setAttribute('style', 'color:#fff; background-color: #5682a3;')
            },
        }
    });
};

document.addEventListener('DOMContentLoaded', init);

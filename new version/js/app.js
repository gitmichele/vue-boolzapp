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
                            date: '08/01/2020',
                            time: '15:30',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020',
                            time: '15:50',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '14/04/2021',
                            time: '16:15',
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
                            date: '19/03/2020',
                            time: '16:30',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '19/03/2020',
                            time: '16:30',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020',
                            time: '16:35',
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
                            date: '28/03/2020',
                            time: '10:10',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020',
                            time: '10:20',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '29/03/2020',
                            time: '16:15',
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
                            date: '13/04/2021',
                            time: '15:30',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '14/04/2021',
                            time: '15:50',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],

            // testo dalla search bar
            textToSearch: '',
            // index contatto selezionato (-1 -> nessun contatto sel)
            selIndex: -1,
            // nome contatto selezionato
            selName: '',
            // img contatto selezionato
            selAvatar: '',
            // testo dalla text area per i nuovi messaggi
            newMsg: '',
            // messaggio selezionato al click del dropdown
            clickedMessage: {},
            // attivo disattivo dropdown
            isActive: false,
        },
        // autoscroll sezione messaggi
        updated() {
            var container = this.$el.querySelector("#autoscroll");
            if (container != null)container.scrollTop = container.scrollHeight;
        },
        methods: {
             
            getDay: function() {

                const today = new Date();

                return ((today.getDate() +
                        '/' +
                        ((today.getMonth() + 1) < 10 ? '0' : '') +
                        (today.getMonth() + 1) +
                        '/' +
                        today.getFullYear()
                ).toString());
            },
            getTime: function() {

                const time = new Date();
                return ((time.getHours() + 
                        ':' +
                        (time.getMinutes() < 10 ? '0' : '') + 
                        time.getMinutes()
                        ).toString())
            },
            // seleziono le date dei messaggi dei contatti e creo un array di date uniche per ogni contatto
            filterDate: function(index) {

                let filter = [];

                for (let i = 0; i < this.filterContacts()[index].messages.length; i++){

                    if (!filter.includes(this.filterContacts()[index].messages[i].date)){

                        filter.push(this.filterContacts()[index].messages[i].date)
                    }
                }
                return filter
            },
            // filtro in base al testo digitato nella barra di ricerca
            filterContacts: function() {

                let filter = [];

                for (let i=0;i<this.contacts.length;i++){

                    if(this.contacts[i].name.toLowerCase().includes(this.textToSearch.toLowerCase())){

                        filter.push(this.contacts[i])
                    }
                }

                return filter
            },
            // quando clicco su un contatto mi porto di qua tre variabili
            getThisContact: function(contact, index) {

                this.selIndex = index;
                this.selName = contact.name;
                this.selAvatar = contact.avatar
            },
            // invio nuovo messaggio + risposta automatica 
            sendMessage: function () {

                const newMsg = this.getNewMessage(this.newMsg, 'sent');

                if (newMsg.text.length == 0 || newMsg.text == '\n'){
                    alert('Non puoi inviare un messaggio vuoto')
                }
                else{
                    this.filterContacts()[this.selIndex].messages.push(newMsg);
                    this.newMsg = '';
                    this.replyMessage();
                }

            },
            replyMessage: function () {

                const toReplyIndex = this.selIndex;

                setTimeout(() => {

                    const newMsg = this.getNewMessage('Ok', 'received');
                    this.filterContacts()[toReplyIndex].messages.push(newMsg);
                }, 1000);
            },
            getNewMessage: function (text, status) {

                day = this.getDay();
                time = this.getTime()

                return {
                    date: day,
                    time: time,
                    text: text,
                    status: status
                };
            },
            // gestisco l'indice ogni volta che digito un tasto nella barra di ricerca
            resetIndex: function() {
                
                this.selIndex = -1;
            },
            getNewIndex: function() {

                const displayedContacts = document.getElementsByTagName('li')

                for (i=0;i<displayedContacts.length;i++){


                    if (displayedContacts[i].classList.contains('selected')){

                        this.selIndex = i;
                    }
                }
            },
            showDropdown: function(message) {
                
                this.isActive = !this.isActive
                this.clickedMessage = message; 
            },
            deleteMessage: function (messageIndex) {

                let toSplice = this.filterContacts()[this.selIndex].messages;

                toSplice.splice(messageIndex, 1)
            }
        },
    });
};

document.addEventListener('DOMContentLoaded', init);

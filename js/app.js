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
                            time: '15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            time: '15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            time: '16:15:22',
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
                            time: '16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            time: '16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            time: '16:35:00',
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
                            time: '10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            time: '10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            time: '16:15:22',
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
                            time: '15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            time: '15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],

            // array di messaggi dei messaggi relativi alla chat selezionata 
            toDisplay: [],
            
            // nuovo messaggio da inviare
            newMsg: '',

            // li selezionato (-> chat selezionata)
            selIndex: null,

            selName: '',

            // stringa dell'input di ricerca
            search: '',

            clickedMsg: [], 

            isDropped: false,

            time: '',

        },
        computed: {

            filteredContacts: function() {

                let self = this;

                return this.contacts.filter(function(contact) {
                    
                    return contact.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
                });   
            }
        },
        methods: {

            // prendo i messaggi da contacts e li stampo nel contentitore html dedicato
            getMessages: function(name, index) {

                this.now()
                // svuoto i messaggi da mostrare da messaggi di chat precedenti
                this.toDisplay = [];
                // assegno l'indice selezionato all'apposita variabile
                this.selIndex = index;
                this.selName = name;
                // conto quanti messaggi devo stampare 
                let numOfMessages = this.filteredContacts[index].messages.length;

                // ciclo per stampare i messaggi del contatto selezionato
                for (i=0; i<numOfMessages; i++){
                    let msg = this.filteredContacts[index].messages[i].text
                    let status = this.filteredContacts[index].messages[i].status
                    this.toDisplay.push({msg, status})
                };                   
            },

            sendMsg: function() {

                // pusho il nuovo messaggio nell'oggetto messaggi del contatto selezionato
                this.filteredContacts[this.selIndex].messages.push({'time': this.time,'text': this.newMsg, 'status': 'sent'})
                // richiamo la funzione che stampa nuovamnete i messaggi, compreso quello nuovo
                this.getMessages(this.selName, this.selIndex)
                // pulisco la textarea per l'inserimento nuovi messaggi
                this.newMsg = ''

                setTimeout(function () {this.answerMsg()}.bind(this), 1000)
            },
            answerMsg: function() {

                let answer = 'ok';
                this.filteredContacts[this.selIndex].messages.push({ 'time': this.time, 'text': answer, 'status': 'received' })
                this.getMessages(this.selName, this.selIndex)
            },
            showDropdown: function(msg) {

                this.clickedMsg = msg
                this.isDropped = true
            },
            deleteMsg: function(index) {

                let toSplice = this.filteredContacts[this.selIndex].messages
                toSplice.splice(index, 1)
                this.getMessages(this.selName, this.selIndex)
            },
            now: function() {

                let event =  new Date()
                this.time = event.toLocaleTimeString('it-IT')
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', init);

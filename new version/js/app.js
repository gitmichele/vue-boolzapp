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

            textToSearch: '',
            selIndex: -1,
            selName: '',
            newMsg: '',
            clickedMessage: {}
        },
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
            filterDate: function(index) {

                let filter = [];

                for (let i = 0; i < this.filterContacts()[index].messages.length; i++){

                    if (!filter.includes(this.filterContacts()[index].messages[i].date)){

                        filter.push(this.filterContacts()[index].messages[i].date)
                    }
                }
                return filter
            },
            filterContacts: function() {

                let filter = [];

                for (let i=0;i<this.contacts.length;i++){

                    if(this.contacts[i].name.toLowerCase().includes(this.textToSearch.toLowerCase())){

                        filter.push(this.contacts[i])
                    }
                }

                return filter
            },
            getThisContact: function(name, index) {

                this.selIndex = index;
                this.selName = name;
            },
            sendMessage: function () {
                const newMsg = this.getNewMessage(this.newMsg, 'sent');
                this.filterContacts()[this.selIndex].messages.push(newMsg);
                this.newMsg = '';
                this.sendAutoReply();
            },
            sendAutoReply: function () {
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
            resetIndex: function() {
                
                this.selIndex = -1
            },
            getNewIndex: function() {

                const test = document.getElementsByTagName('li')

                for (i=0;i<test.length;i++){


                    if (test[i].classList.contains('selected')){

                        this.selIndex = i
                    }
                }
            },
            showDropdown: function(message) {
                
                // this.clickedMessage = message
                this.clickedMessage = message; 
            },
            deleteMessage: function (messageIndex) {

                let toSplice = this.filterContacts()[this.selIndex].messages;

                toSplice.splice(messageIndex, 1)
            },
        }
    });
};

document.addEventListener('DOMContentLoaded', init);

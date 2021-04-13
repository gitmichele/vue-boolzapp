function init() {

    new Vue({

        el: '#app',
        data: {
            contacts: [
                {
                    name: 'Michele',
                    avatar: 'img/avatar1.png',
                    visible: true,
                    date: [
                        [
                            {
                                day: '12/4/2021',
                                time: '15:30',
                                text: 'Hai portato a spasso il cane?',
                                status: 'sent'
                            },
                            {
                                day: '12/4/2021',
                                time: '15:50',
                                text: 'Ricordati di dargli da mangiare',
                                status: 'sent'
                            }
                        ],
                        [
                            {
                                day: '13/4/2021',
                                time: '8:30',
                                text: 'Tutto fatto!',
                                status: 'received'
                            },
                            {
                                day: '13/4/2021',
                                time: '8:35',
                                text: 'Grazie',
                                status: 'sent'
                            },
                            {
                                day: '13/4/2021',
                                time: '9:00',
                                text: 'E di che',
                                status: 'received'
                            }
                        ]
                    ]
                },
                {
                    name: 'Fabio',
                    avatar: 'img/avatar2.png',
                    visible: true,
                    date: [
                        [
                            {
                                day: '8/4/2021',
                                time: '10:30',
                                text: 'Ciao come stai?',
                                status: 'sent'
                            },
                            {
                                day: '12/4/2021',
                                time: '15:50',
                                text: 'Scusa avevo perso il telefono',
                                status: 'received'
                            },
                            {
                                day: '12/4/2021',
                                time: '15:52',
                                text: 'Bene grazue tu?',
                                status: 'received'
                            },
                        ],
                        [
                            {
                                day: '12/4/2021',
                                time: '16:30',
                                text: 'Bene Anche io!',
                                status: 'sent'
                            },
                        ]
                    ]
                },
                {
                    name: 'Samuele',
                    avatar: 'img/avatar3.png',
                    visible: true,
                    date: [
                        [
                            {
                                day: '1/3/2021',
                                time: '14:21',
                                text: 'La Marianna va in campagna',
                                status: 'received'
                            },
                            {
                                day: '1/3/2021',
                                time: '15:00',
                                text: 'Sicuro di non aver sbagliato?',
                                status: 'sent'
                            }
                        ],
                        [
                            {
                                day: '2/3/2021',
                                time: '21:41',
                                text: 'Avevo sbagliato scusa',
                                status: 'received'
                            },
                        ]
                    ]
                },
                {
                    name: 'Luisa',
                    avatar: 'img/avatar4.png',
                    visible: true,
                    date: [
                        [
                            {
                                day: '13/4/2021',
                                time: '12:30',
                                text: 'Sai che ha aperto una nuova pizzeria?',
                                status: 'sent'
                            },
                            {
                                day: '13/4/2021',
                                time: '12:34',
                                text: 'Preferirei andare al cinema',
                                status: 'received'
                            }
                        ],
                    ]
                },
            ],

            selectedContactIndex: -1,
            selectedContactName: '',
            messageToSend: '',
            textToSearch: '',
            newIndex: -1,
            clickedMessage: {},
        },
        updated() {
            var container = this.$el.querySelector("#autoscroll");
            if (container != null) container.scrollTop = container.scrollHeight;
        },
        methods: {

            getDay: function () {

                const today = new Date();

                return ((today.getDate() +
                    '/' +
                    (today.getMonth() + 1) +
                    '/' +
                    today.getFullYear()
                ).toString());
            },
            getTime: function () {

                const time = new Date();
                return ((time.getHours() +
                    ':' +
                    (time.getMinutes() < 10 ? '0' : '') +
                    time.getMinutes()
                ).toString())
            },
            getThisContact: function (name, index) {

                this.selectedContactIndex = index;
                this.selectedContactName = name;
            },
            addNewMessage: function (message, msgStatus) {

                const now = this.getTime();
                const today = this.getDay();

                return { day: today, time: now, text: message, status: msgStatus }
            },
            receiveMessage: function (date) {

                const lastDate = date[date.length - 1];
                const today = this.getDay();

                setTimeout(() => {

                    const toSend = this.addNewMessage('ok', 'received')

                    if (lastDate[0].day == today) {

                        lastDate.push(toSend)
                    }
                    else {

                        date.push([toSend])
                    }
                }, 1000)
            },
            sendMessage: function () {

                const selObj = this.filteredContacts()[this.selectedContactIndex];
                const selDate = selObj.date;
                const lastDate = selDate[selDate.length - 1];
                const today = this.getDay();

                const toSend = this.addNewMessage(this.messageToSend, 'sent')


                if (lastDate[0].day == today) {

                    lastDate.push(toSend)
                }
                else {

                    selDate.push([toSend])
                }

                this.messageToSend = '';

                this.receiveMessage(selDate);
            },
            filteredContacts: function () {

                filter = [];

                for (let i = 0; i < this.contacts.length; i++) {

                    if (this.contacts[i].name.toLowerCase().includes(this.textToSearch.toLowerCase())) {

                        filter.push(this.contacts[i])
                    }
                }

                return filter
            },
            resetIndex: function () {

                this.selectedContactIndex = -1
            },
            getNewIndex: function () {

                const test = document.getElementsByTagName('li')

                for (i = 0; i < test.length; i++) {


                    if (test[i].classList.contains('selected')) {

                        this.selectedContactIndex = i
                    }
                }
            },
            toggleDropdown: function (message) {

                this.clickedMessage = message;
            },
            deleteMessage: function (dataIndex, messageIndex) {

                // let toSplice = this.filteredContacts()[this.selectedContactIndex].data[dataIndex][messageIndex]
                // toSplice.splice(messageIndex, 1)
            },
        }
    });
};

document.addEventListener('DOMContentLoaded', init);

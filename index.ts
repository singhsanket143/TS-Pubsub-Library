// Implement a pubsub library that can be readily plugged anywhere and used. 
// subcribe function - Event ----> returns f, if you call f then you will unsubscribed
// publish -> event, data


class Pubsub {

    // eventName: [eventListener1, eventListener2,.....]
    // 'sendMessage': [f1, g1, h1], 'sendEmoji': [f2,g2,h2]

    private eventList : { [key: string]: Array<(data: any) => void> } = {};

    subscribe(event: string, eventListener: (data: any) => void): () => void {

        if(!this.eventList[event]) {
            this.eventList[event] = []; // create a new array if the event is never prev registered
        }

        this.eventList[event].push(eventListener);

        return () => {
            this.eventList[event] = this.eventList[event].filter(listener => listener !== eventListener);
        }
    }

    publish(event: string, data: any): void {
        if(!this.eventList[event]) {
            return;
        }

        this.eventList[event].forEach(currEventListener => currEventListener(data));
    }


}


const pubsub = new Pubsub();

const messageTopicUnsubscribe1 = pubsub.subscribe('sendMessage', function f1(data) {
    console.log("send message received in f", data);
});
const messageTopicUnsubscribe2 = pubsub.subscribe('sendMessage', function g1(data) {
    console.log("send message received in g", data)
});

// somewhere elese in the code
setInterval(() => {
    pubsub.publish('sendMessage', { senderId: 1, messageContent: Date.now() });
}, 3000);

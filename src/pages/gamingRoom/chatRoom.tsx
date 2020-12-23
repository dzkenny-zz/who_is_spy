import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { sendMessage } from '../../actions/game';
import { useStores } from '../../stores';

const ChatRoom = observer(() => {
    const stores = useStores();
    const { history } = stores.gameStore;
    const [message, setMessage] = useState('');

    const onMessageChange = (event: any) => {
        setMessage(event.target.value);
    }

    const onSendMessage = () => {
        sendMessage({ stores, message });
        setMessage('');
    }
    return (
        <div className="chat-box">
            <div className="chat-history">
                {
                    history.map((h, i) => (
                        <div key={`message-${i}`}>
                            <div className="message-content">[{h.username}]: {h.message}</div>
                        </div>
                    ))
                }
            </div>
            <div className="chat-field">
                <input
                    className="chat-input"
                    value={message}
                    onChange={onMessageChange}
                />
                <button
                    className="send-button"
                    onClick={onSendMessage}
                >
                    傳送
                </button>
            </div>
        </div>
    )
});

export default ChatRoom;
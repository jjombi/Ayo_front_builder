import React from "react";
import io from 'socket.io-client';

const Waiting_popup = ({uuid}) => {

    const socket = io.connect('http://localhost:5550', {
        path: '/socket.io',
        transports: ['websocket'],
    });
    // console.log('join',socket);
    socket.emit('join_room',uuid);

    return(
        <section className="Waiting_popup_root password_popup_root">
            <div className="waiting_popup_content">
                <div>
                    <p>player1</p>
                </div>
                <div>
                    <p>player2</p>
                </div>
                <section>
                    <button>준비완료</button>
                    <button>나가기</button>
                </section>
            </div>
        </section>
    )
}
export default Waiting_popup;
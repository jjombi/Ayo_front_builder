import React, { useEffect, useRef } from "react";
import Header from "../../ayo_world_rank_header";
import '../../css.css';
import Phaser from 'phaser';
import {useLocation} from 'react-router-dom';
import io from 'socket.io-client';
const Egg = () =>{
    const game = useRef(null);
    const { state } = useLocation();

    class Main extends Phaser.Scene
    {   
        preload(){

        }
        create(){

            this.socket = io.connect('http://localhost:5550', {
                path: '/socket.io',
                transports: ['websocket'],
            });
            console.log('join',this.socket);
            this.socket.emit('join_room',state.uuid);

            this.socket.on('game_start',data=>{
                console.log('game start,',data);
            })

            // this.socket.on('welcome')
        }
        update(){
            // this.clickbtnfunc(this.input);
        }

        // clickbtnfunc(input) {
        //     if(input.keyboard.addKey('S').isDown || input.keyboard.addKey('D').isDown || input.keyboard.addKey('f').isDown){
        //         console.log('L');
        //     }
        //     else if(input.keyboard.addKey('J').isDown || input.keyboard.addKey('K').isDown || input.keyboard.addKey('I').isDown){
        //         console.log('R');
        //     }
        //     else if(input.keyboard.addKey('SPACE').isDown){
        //         console.log('space');
        //     }
        //     else{

        //     }

        // }
    }

    const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        scene: Main,
        physics: {
            default: 'arcade',
            arcade: {
                // gravity: { y: 0 }
            }
        },
        plugins: {
            scene: [
                {
                    key: 'PhaserRaycaster',
                    mapping: 'raycasterPlugin'
                }
            ]
        }
    };

    useEffect(()=>{
        const rootElement = document.getElementById('root');
        const bodyElement = document.querySelector('body');
        rootElement.remove();
        bodyElement.style.overflow = 'hidden';
        game.current = new Phaser.Game(config);
    },[]);
    // return(
    //     <div ref={game}></div>
    // )
}
export default Egg;

// 버튼 세개, 덮개 치기, 덮개 들기, 도마 치기,
// 덮개가 덮여있으면 덮개를 치거나, 들수 있음
// 덮게가 들려있으면 도마쳐야함
// 위 경우에 벗어나면 탈락 
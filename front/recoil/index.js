import { atom } from "recoil"

const produce_data = atom({
    key : 'produce_data',
    default : {
        uuid : '',
        quezeshow_type_clicked_btn : null,
        password : '',
        content_state : [],
        content_object : [],
        time_checkbox : false,
        main_img : [null,null],
        password_popup : false,
        tag_arr : []
    }
})

export {produce_data};
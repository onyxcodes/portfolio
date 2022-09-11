import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type MenuEntry = {
    attributes: {
        order: number;
        title: string;
        url: string;
        createdAt: string;
        updatedAt: string;
        children: {
            data: MenuEntry[]
        }
    };
    id: number;
}
export type MenuData = MenuEntry[]

const findMenu = async (slug: string) => {
    try {
        const { data } = await axios.get(
            `${process.env.API_ENDPOINT}/api/menus?filters[slug][$eq]=${slug}`, {
                'method': 'GET',
                "headers": {
                    'Authorization': `Bearer ${process.env.API_TOKEN}`

                }
            }
        );
        return data.data;
    } catch (e) {
        console.log(e)
    }      
}


const loadMenu = async (id: number) => {
    try {
        const { data } = await axios.get(
            `${process.env.API_ENDPOINT}/api/menus/${id}?nested=true&populate=*`, {
                'method': 'GET',
                "headers": {
                    'Authorization': `Bearer ${process.env.API_TOKEN}`

                }
            }
        );
        // We are interested only in the content of the given menu
        return data.data.attributes.items.data;
    } catch (e) {
        console.log(e)
    }      
}

const action = createAsyncThunk('loadMenu', 
    async ( slug: string, thunkApi ) => {
        let menuData;
        let menuList = await findMenu(slug);
        if ( !menuList.length ) throw new Error(`Could not load menu with slug: ${slug}`)
        
        let menuId = menuList[0].id;
        menuData = await loadMenu(menuId);
        return menuData;
    }
)

export default action;
// const 
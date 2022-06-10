import { Editors } from 'src/types/entities';
import cursor from 'src/assets/img/cursor.svg';
import node from 'src/assets/img/node.svg';
import route from 'src/assets/img/line.svg';
import search from 'src/assets/img/search.svg';

export const BUTTONS = [
    { editor: Editors.SELECT, img: cursor, text: 'Select' },
    { editor: Editors.CREATE_NODE, img: node, text: 'Create node' },
    { editor: Editors.CREATE_ROUTE, img: route, text: 'Create route' },
    { editor: Editors.FIND_SHORTEST_ROUTE, img: search, text: 'Find shortest route' },
];

export const NAVBAR_HEIGHT = 66;

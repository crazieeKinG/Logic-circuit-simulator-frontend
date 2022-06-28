const FIREBASE_GET_PROJECT_URL = "http://localhost:3000/project/";
const FIREBASE_GET_INFORMATION_URL = "http://localhost:3000/information/all";
const FIREBASE_POST_URL = "http://localhost:3000/project/new";

const CANVAS = document.querySelector("#workspace");

const lineWidth = 3;

const client_dx = 300;
const client_dy = 50;

CANVAS.width = window.innerWidth - client_dx;
CANVAS.height = window.innerHeight - client_dy;

const canvas_width = CANVAS.width;
const canvas_height = CANVAS.height;

let context = CANVAS.getContext('2d');
context.lineWidth = lineWidth;
const fill_color = "#fa8072";
const active_color = "#688eff";

let SELECTED_UNIT;
let DRAG_UNIT = false;
let DX, DY;

let index_for_unit = 0;
let units = {};
let focused_unit = null;

let mouse_X, mouse_Y;

// Input and output node for wire connection
const node_selected = document.querySelector("#node_selected");
let selected_input_output_node = [];

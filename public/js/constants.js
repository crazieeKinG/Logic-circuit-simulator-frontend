const API_GET_PROJECT_URL = "http://localhost:3000/project/";
const API_GET_INFORMATION_URL = "http://localhost:3000/information/all";
const API_POST_URL = "http://localhost:3000/project/new";
const API_DELETE_PROJECT_URL = "http://localhost:3000/project/delete/";

let data_loaded = false;

const CANVAS = document.getElementById("workspace");

const LINEWIDTH = 3;

const CLIENT_DX = 300;

CANVAS.width = window.innerWidth - CLIENT_DX;
CANVAS.height = window.innerHeight;

const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;

const CONTEXT = CANVAS.getContext('2d');
CONTEXT.lineWidth = LINEWIDTH;

const FILL_COLOR = "#fa8072";
const ACTIVE_COLOR = "#688eff";
const SELECTED_COLOR = "#72faab";
const INACTIVE_COLOR = "white";

const CLICK_EVENT = "click";
const DOUBLE_CLICK_EVENT = "dblclick";

let selected_unit;
let drag_unit = false;
let dx, dy;

let index_for_unit = 0;
let units = {};
let focused_unit = null;

const { x, y } = CANVAS.getBoundingClientRect();
let mouse_x, mouse_y;

// Input and output node for wire connection
const NODE_SELECTED = document.getElementById("node_selected");
let selected_input_output_node = [];


const CURRENT_URL = new URLSearchParams(window.location.search);
let project_id = CURRENT_URL.get('id');

// DOM components
const CLEAR_NODE_SELECTION = document.getElementById("clear_node_selection");
const DELETE_SELECTED_NODE = document.getElementById("delete_selected_node");
const PROJECT_TITLE = document.getElementById("title");
const STATUS = document.getElementById("save_status");
const SAVE_PROJECT = document.getElementById("save");
const DELETE_PROJECT = document.getElementById("delete");

const INFORMATION_SECTION = document.getElementById("information");
const INFORMATION_DATA = [];

//DOM logical units
const AND_BTN = [...document.getElementsByClassName("and_gate")];
const FREQUENCY_VALUE = document.getElementById("frequency_value");
const FREQUENCY_GENERATOR_BTN = [...document.getElementsByClassName("frequency_generator")];
const SWITCH_BTN = document.getElementById("switch_input");
const JK_BTN = document.getElementById("jk_flipflop");
const LIGHT_BTN = document.getElementById("light_output");
const NAND_BTN = [...document.getElementsByClassName("nand_gate")];
const NOR_BTN = [...document.getElementsByClassName("nor_gate")];
const NOT_BTN = document.getElementById("not_gate");
const OR_BTN = [...document.getElementsByClassName("or_gate")];
const SR_BTN = document.getElementById("sr_flipflop");
const XOR_BTN = [...document.getElementsByClassName("xor_gate")];
const XNOR_BTN = [...document.getElementsByClassName("xnor_gate")];
const T_BTN = document.getElementById("t_flipflop");


const POSITION_X = CANVAS_WIDTH - 100;
const POSITION_Y = 10;
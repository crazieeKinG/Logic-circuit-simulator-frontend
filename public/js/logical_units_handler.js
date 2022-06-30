// Logical units event handlers

AND_BTN.forEach(and_gate=>{
    and_gate.addEventListener(CLICK_EVENT, () => {
        index_for_unit++;
        units[index_for_unit] = new And(POSITION_X, POSITION_Y, parseInt(and_gate.getAttribute('inputs')));
    });
})

FREQUENCY_GENERATOR_BTN.forEach(frequency_generator => {
    frequency_generator.addEventListener(CLICK_EVENT, () => {
        index_for_unit++;
        units[index_for_unit] = new Frequency_generator(POSITION_X, POSITION_Y, FREQUENCY_VALUE.value);
    });
}); 

SWITCH_BTN.addEventListener(CLICK_EVENT, () => {
    index_for_unit++;
    units[index_for_unit] = new Switch(POSITION_X, POSITION_Y);
});

JK_BTN.addEventListener(CLICK_EVENT, () => {
    index_for_unit++;
    units[index_for_unit] = new JK(POSITION_X, POSITION_Y);
});

LIGHT_BTN.addEventListener(CLICK_EVENT, () => {
    index_for_unit++;    
    units[index_for_unit] = new Light(POSITION_X, POSITION_Y);
});

NAND_BTN.forEach(nand => {
    nand.addEventListener(CLICK_EVENT, () => {
        index_for_unit++;
        units[index_for_unit] = new Nand(POSITION_X, POSITION_Y, parseInt(nand.getAttribute('inputs')));
    });
});

NOR_BTN.forEach(nor => {
    nor.addEventListener(CLICK_EVENT, () => {
        index_for_unit++;
        units[index_for_unit] = new Nor(POSITION_X, POSITION_Y, parseInt(nor.getAttribute('inputs')));
    });
});

NOT_BTN.addEventListener(CLICK_EVENT, () => {
    index_for_unit++;
    units[index_for_unit] = new Not(POSITION_X, POSITION_Y);
});

OR_BTN.forEach(or_gate => {
    or_gate.addEventListener(CLICK_EVENT, () => {
        index_for_unit++;
        units[index_for_unit] = new Or(POSITION_X, POSITION_Y, parseInt(or_gate.getAttribute('inputs')));
    });
})

SR_BTN.addEventListener(CLICK_EVENT, () => {
    index_for_unit++;
    units[index_for_unit] = new SR(POSITION_X, POSITION_Y);
});

XOR_BTN.forEach(xor => {
    xor.addEventListener(CLICK_EVENT, () => {
        index_for_unit++;
        units[index_for_unit] = new Xor(POSITION_X, POSITION_Y, parseInt(xor.getAttribute('inputs')));
    });
});

XNOR_BTN.forEach(xnor => {
    xnor.addEventListener(CLICK_EVENT, () => {
        index_for_unit++;
        units[index_for_unit] = new Xnor(POSITION_X, POSITION_Y, parseInt(xnor.getAttribute('inputs')));
    });
});

T_BTN.addEventListener(CLICK_EVENT, () => {
    index_for_unit++;
    units[index_for_unit] = new T(POSITION_X, POSITION_Y);
});
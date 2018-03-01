import * as types from "../types";

const initialState = {
    current: 0,
    initForm: false,
    isFinalStep: false,
    previousLabel: null,
    nextLabel: null,
    percentage: 0,
    maxForms: 9,
    flowNavigation: [0],
    wizardCompleted: false
};

const accountablePercentageForm = 4;

function calculatePercentage(current) {
    return Math.floor(((current - 1) / accountablePercentageForm) * 100);
}

const wizard = (state = initialState, action) => {
    let btnType = action.footerType;
    switch (action.type) {
        case types.ON_WIZARD_LOAD_START:
            return state;
        case types.ON_WIZARD_LOAD_END:
            return {...state, previousLabel: btnType.previousButton, nextLabel: btnType.nextButton};
        case types.ON_WIZARD_NEXT_START:
            return state;
        case types.ON_WIZARD_NEXT_END:
            state.flowNavigation.push(action.current);
            return {
                ...state,
                current: action.current,
                isFinalStep: action.isFinalStep,
                percentage: calculatePercentage(action.current),
                previousLabel: btnType.previousButton,
                nextLabel: btnType.nextButton
            };
        case types.ON_WIZARD_PREVIOUS_START:
            return state;
        case types.ON_WIZARD_PREVIOUS_END:
            state.flowNavigation.push(action.current);
            return {
                ...state,
                current: action.current,
                isFinalStep: false,
                percentage: calculatePercentage(action.current),
                previousLabel: btnType.previousButton,
                nextLabel: btnType.nextButton
            };
        case types.ON_WIZARD_COMPLETED:
            return {...state, wizardCompleted: true};
        case types.ON_WIZARD_RESET:
            return initialState;
        default:
            return state;

    }
};

export default wizard;
export function reduceViewType(viewType, action) {
    switch (action.type) {
        case 'CHANGE_VIEW_TYPE':
            viewType = action.viewType;
    }
    return viewType;
}
//# sourceMappingURL=view-type.js.map
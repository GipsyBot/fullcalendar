import { rangeContainsMarker } from '../datelib/date-range';
export function reduceDateProfile(currentDateProfile, action, currentDate, dateProfileGenerator) {
    var dp;
    switch (action.type) {
        case 'CHANGE_VIEW_TYPE':
            return dateProfileGenerator.build(action.dateMarker || currentDate);
        case 'CHANGE_DATE':
            if (!currentDateProfile.activeRange ||
                !rangeContainsMarker(currentDateProfile.currentRange, action.dateMarker) // don't move if date already in view
            ) {
                return dateProfileGenerator.build(action.dateMarker);
            }
            break;
        case 'PREV':
            dp = dateProfileGenerator.buildPrev(currentDateProfile, currentDate);
            if (dp.isValid) {
                return dp;
            }
            break;
        case 'NEXT':
            dp = dateProfileGenerator.buildNext(currentDateProfile, currentDate);
            if (dp.isValid) {
                return dp;
            }
            break;
    }
    return currentDateProfile;
}
//# sourceMappingURL=date-profile.js.map
// import Stack from "../contentstack-sdk";
// import { addEditableTags } from "@contentstack/utils";

// const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

import {getEntry, getEntryByUrl} from "../contentstack-sdk/index";

export const getHeaderRes = async () => {
    console.log("getHeaderRes")
    const response = await getEntry({
        contentTypeUid: "event_navbar",
        referenceFieldPath: [],
        jsonRtePath: [],
    });

    // liveEdit && addEditableTags(response[0][0], "event_navbar", true);
    console.log(response)
    return response[0][0];
};

export const getHeroRes = async () => {
    console.log("getHeroRes")
    const response = await getEntry({
        contentTypeUid: "event_hero_page",
        referenceFieldPath: [],
        jsonRtePath: [],
    });

    // liveEdit && addEditableTags(response[0][0], "event_navbar", true);
    console.log(response)
    return response[0][0];
};

export const getEventFeaturesRes = async () => {
    console.log("Event feature")
    const response = await getEntry({
        contentTypeUid: "event_feature_page",
        referenceFieldPath: ["event"],
        jsonRtePath: [],
    });

    // liveEdit && addEditableTags(response[0][0], "event_navbar", true);
    console.log(response)
    return response[0][0];
};

export const getEvent = async (entryUrl) => {
    const response = await getEntryByUrl({
        contentTypeUid: 'event',
        entryUrl: entryUrl,
        referenceFieldPath: [],
        jsonRtePath: []
    });

    return response[0];
}
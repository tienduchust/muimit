/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author cuongnt@bkav.com on 27/11/2017.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

const storeConfig = {
    // Messenger
    threadMessageIds: 'threadMessageIds',
    threads: 'threads',
    threadUserIds: 'threadUserIds',
    messages: 'messages',
    threadResultIds: 'threadResultIds', // Search trong Messenger
    threadSearchIds: 'threadSearchIds', // Search trong Messenger
    userSearchIds: 'userSearchIds', // Search trong Messenger
    threadPinMessageIds: 'HasMessagePin',
    messengerApp: 'messengerApp',
    threadPinIds: 'HasThreadPin',
    userThreadIds: 'userThreadIds',
    messageSearchIds: 'messageSearchIds',
    threadFile: 'threadFileIds',
    threadImage: 'threadImageIds',

    // Messenger tag thread
    threadTag: 'threadTag',
    hasThreadTag: 'hasThreadTag',
    tagThreadIds: 'tagThreadIds',
    threadTagIds: 'threadTagIds',

    // Messenger reply message
    threadReplyIds: 'threadReplyIds',
    replyMessageIds: 'replyMessageIds',

    // User
    users: 'User',
    companyUserIds: 'HasUser', // tổng số user trong company(base/modules/company/companyUser.default)
    meId: 'meId',
    userFriends: 'userFriends',
    searchUser: 'searchUser',

    // Global
    auth: 'auth',
    configProfile: 'configProfile',
    globalUi: 'globalUi',
    typing: 'typing',
    administrators: 'administrators',
    dockCard: 'dockCard',
    current: 'current',

    // Company
    userCompanyIds: 'HasCompany', // 1 user thuộc mấy công ty(base/modules/user/userCompany.default)
    companies: 'Company',
    companyJobTitleIds: 'HasJobTitle',
    companyPositionIds: 'HasPosition',

    // Department
    HasDepartment: 'HasDepartment',
    departments: 'Department',
    departmentChilds: 'departmentChilds',
    departmentUserIds: 'HasUser', // tổng số user trong company(base/modules/company/companyUser.default)
    userDepartmentIds: 'HasUserDepartment',
    departmentTree: 'departmentTreeData',
    deptJobUsers: 'departmentJobTitleUser',
    jobTitles: 'JobTitle',
    positions: 'Position',

    // Attachment
    Attachment: 'Attachment',
    HasAttachment: 'HasAttachment',

    // Notify
    userNotifyTypes: 'HasNotifyTypes',
    notifyTypes: 'NotifyTypes',
    notifyIds: 'HasNotify',
    notifys: 'Notify',
    notifyPopupData: 'notifyPopupData',
    UnreadNotify: 'UnreadNotify', // Notify chua doc.

    // Note
    userNoteBook: 'HasNotebook',
    userNoteTrash: 'InTrash',
    userArchive: 'InArchive',
    userNoteBookImportant: 'TagImportant',
    userPageImportant: 'TagImportant',
    noteBook: 'Notebook',
    noteBookPage: 'HasPage',
    noteBookPageImportant: 'TagImportant',
    page: 'Page',
    pageSubPage: 'HasSubPage',
    subPage: 'SubPage',
    noteBookSession: 'HasSession',
    session: 'Session',
    userNoteLabel: 'HasLabel', // Các noteLabel của user
    noteLabel: 'Label', // Kho NoteLabel
    noteLabelPage: 'HasPageLabel', // Các page tìm thấy theo các noteLabel
    pageNoteLabel: 'HasLabel', // Các noteLabel của 1 page
    noteUiState: 'uiStateNote',

    // Entry
    Entry: 'Entry',
    HasEntry: 'HasEntry',
    EntryTyping: 'EntryTyping',
    HasComment: 'HasComment',
    Comment: 'Comment',
    Tagged: 'Tagged',
    Reaction: 'Reaction',
    ReactionAll: 'ReactionAll',
    ReactionLike: 'ReactionLike',
    ReactionLove: 'ReactionLove',
    ReactionWow: 'ReactionWow',
    ReactionHaha: 'ReactionHaha',
    ReactionSad: 'ReactionSad',
    ReactionAngry: 'ReactionAngry',
    ReactionThankful: 'ReactionThankful',
    ReactionTypes: 'ReactionTypes',
    Audience: 'Audience',
    HasAudience: 'HasAudience',
    HasConfig: 'HasConfig',
    EntryFollow: 'FollowEntry',

    // Group
    Group: 'Group',
    HasGroup: 'HasGroup',
    HasGroupOrder: 'HasGroupOrder',
    // TODO NamVH : Chuyen appStream.
    HasGroupChild: 'GroupChild',
    groupTreeData: 'groupTreeData',
    HasUser: 'HasUser', // Danh sach user trong mot group

    // Annc
    AnncGroup: 'AnncGroup',
    anncApp: 'anncApp',
    anncUiState: 'anncApp_uiState',
    Tag: 'Tag', // Tag - Annc.
    HasTag: 'HasTag',

    // Stream
    HasStream: 'HasStream',
    HasUnapprovalStatus: 'HasUnapprovalStatus', // Entry Pending

    // pin
    HasPinConfigApp: 'HasPinConfigApp',
    HasPinConfigCompany: 'HasPinConfigCompany',
    PinChild: 'PinChild',
    TaskProject: 'TaskProject',
    TaskFilter: 'TaskFilter',
    TaskLabel: 'TaskLabel',
    HasNodePin: 'HasNodePin',
    HasPin: 'HasPin',
    pinTree: 'pinTreeData',

    // Pin
    Pin: 'Pin',
    PinType: 'PinType',
    HasPinChild: 'HasPinChild',
    HasPinType: 'HasPinType',
    HasPinned: 'HasPinned',
    HasApp: 'HasApp',
    App: 'App',

    // Application
    Applications: 'Applications',
    HasApplication: 'HasApplication',
    appType: 'AppType',

    // Mobile Application
    ApplicationsMobile: 'ApplicationsMobile',
    HasApplicationMobile: 'HasApplicationMobile',
    mobileSidebar: 'uiSidebar',
    mobileBar: 'ui',

    // Save App.
    Collection: 'Collection',
    HasCollection: 'HasCollection',
    HasSave: 'HasSave',
    HasSaveCollection: 'HasSaveCollection',
    saveUiState: 'save_ui',

    // area & feedback
    Area: 'Area',
    HasArea: 'HasArea',
    Field: 'Field',
    HasField: 'HasField',
    Feedback: 'Feedback',
    HasFeedback: 'HasFeedback',

    // Map
    MapType: 'mapType',
    HasMapType: 'HasMapType',
    MapPoint: 'MapPoint',
    HasMapPoint: 'HasMapPoint',

    // Document App
    folders: 'Folders',
    documents: 'Documents',
    documentIds: 'HasDocument',
    folderIds: 'HasFolder',
    folderChild: 'FolderChild',
    folderTree: 'folderTreeData',

    // SNW APP
    profile: 'profile',
    publicFolderTree: 'publicFolderTreeData',
    blogApp: 'blogApp',
    managementApp: 'managementApp',
    homeUiState: 'homeApp_uiState',
    contactApp: 'contactApp',
    settingProfile: 'settingProfile',
    inFeed: 'InFeed',
    hasVersion: 'HasVersion',
};

export default storeConfig;

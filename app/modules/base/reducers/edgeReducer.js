/* eslint-disable guard-for-in */
/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author cuongnt@bkav.com on 17/10/2017.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 *
 * Document:
 * - Mau action:
 *  const action = {entrySeq
 *      type: 'OBJECT_ADD',
 *      parentId: 92345234923341234,
 *      fakeId: 1341343242341341,
 *      getType: 'first|newer|older'
 *      payload: {
 *          // Goi tin chuan de gui thang len server duoc
 *      }
 *  };
 */

'use strict';

import {fromJS, Map, OrderedSet} from 'immutable';
import createReducer from './createReducer';
import {EDGE_ACTIONS} from './edgeReducerActions';
import {GET_LIST_TYPE} from '../configs/Constants';

// FROM SERVER

/**
 * Goi khi lay danh sach object tu server tra ve
 * Ghi chu:
 * - Chi itemIds cua mainStateKey (VD: HasEntry) moi xet toi getType.
 *   Cac itemIds phu khac (HasComment) di kem qua trinh lay nay se phai reset toan bo neu khong se gay sai thu tu.
 */
const addListByEdge = (state, action) => {
    const {objectIds, getType} = action.payload;
    // CuongNT: bo sung them quy uoc searchKey de dung lam id cho luu cac ket qua search
    const {searchKey, mainStateKey, stateKey, searchStateKeys} = action.condition;
    if (!stateKey) {
        throw new Error('edgeReducer::addListByEdge::stateKey la bat buoc.');
    }
    const isMainStateKey = mainStateKey && mainStateKey === stateKey;
    const isSearchStateKey = searchStateKeys && searchStateKeys[stateKey];
    // TODO by CuongNT: Dang de tam 2 dieu kien isGetList, isPost kiem tra dua tren 2 cai duoi. Sau se truyen lai chuan tu ngoai vao
    const isGetList = mainStateKey && mainStateKey.length > 0;
    /*
     HieuNVb: thêm tạm !isGetList xét trường hợp postListUi hiện đang mặc định getType là NEWER, cần tính kỹ hơn chỗ này.
     Vd để test trường hợp này là chỗ thêm thành viên vào group, sẽ ko update vào state được vì isGetList = false và isPost cũng false
    */
    const isPost = !getType || !isGetList;
    // const isPost = !getType;
    // console.log('isMainStateKey: ' + isMainStateKey + '; stateKey: ' + stateKey + '; mainStateKey: ' + mainStateKey);
    return state.withMutations((stateTmp) => {
        objectIds.keySeq().forEach((parentId) => {
            const _parentId = isMainStateKey
                ? searchKey || parentId
                : isSearchStateKey
                    ? searchStateKeys[stateKey]
                    : parentId;
            if (stateTmp.has(_parentId)) {
                // HieuNVb: xử lý tình huống lấy mới và có nhiều tin hơn số tin lấy được thì sẽ reset
                // const count = objectIds.getIn([parentId, 'count']);
                // const objItemIds = objectIds.getIn([parentId, 'itemIds']);

                // Kiểm tra điều kiện reset khi số tin mới nhiều hơn số lấy được
                // CuongNT - 2/8/18: bo sung them dieu kien isMainStateKey de chi thuc hien viec reset nay tren chinh list dang lay truc tiep, list phu di kem khong can reset.
                // NamVH - 16/02/2019 (Start 1.0): bỏ tạm cơ chế reset này. => để điều chỉnh logic cho việc getMid => getNew.
                // if (isMainStateKey && count && objItemIds && count > objItemIds.size && isGetList && (getType === GET_LIST_TYPE.NEWER)) {
                //     // Đè toàn bộ lện dữ liệu cũ
                //     stateTmp.update(parentId, () => objectIds.get(parentId));
                // } else {

                const _minScoreNew = objectIds.getIn([parentId, 'minScore']) || 0;
                const _maxScoreNew = objectIds.getIn([parentId, 'maxScore']) || 0;
                const _minScoreCur = stateTmp.getIn([parentId, 'minScore']) || 0;
                const _maxScoreCur = stateTmp.getIn([parentId, 'maxScore']) || 0;
                // const isNewGreater = _maxScoreCur < _minScoreNew;
                // const isNewChuaCur = _minScoreNew < _minScoreCur && _maxScoreNew > _maxScoreCur;
                // const isNew2Cur = _minScoreNew <= _minScoreCur && _maxScoreNew >= _minScoreCur && _maxScoreNew <= _maxScoreCur;
                // const isCur2New = _minScoreCur <= _minScoreNew && _maxScoreCur >= _minScoreNew && _maxScoreCur <= _maxScoreNew;
                // CuongNT: GIU LAI 2 COMMENT DUOI DE DU LOGIC, DU KHONG DUNG TOI
                // const isCurGreater = _maxScoreNew < _minScoreCur;
                // const isCurChuaNew = _minScoreCur < _minScoreNew && _maxScoreCur > _maxScoreNew;
                stateTmp.updateIn([_parentId, 'itemIds'], (itemIds) => {
                    // CuongNT: QUAN TRONG, cac dieu kien xet ben items can giong 100% voi ben itemIds, vi 2 du lieu nay tuong ung 1-1
                    if (isPost) {
                        if (itemIds && objectIds.getIn([parentId, 'itemIds'])) {
                            // Added DamBV 1/6/2018 khong thuc hien hoan de vi tri tin nhan bi loi. Theo doi them.
                            if(itemIds.includes(objectIds.getIn([parentId, 'itemIds']).first())) return itemIds;
                            return objectIds.getIn([parentId, 'itemIds']).merge(itemIds);
                        }
                        if (itemIds) {
                            return itemIds;
                        }
                        if (objectIds.getIn([parentId, 'itemIds'])) {
                            return objectIds.getIn([parentId, 'itemIds']);
                        }
                    } else if (isGetList) {
                        // TODO by CuongNT: Con tinh huong cung 1 itemIds, xong 1 cai update trong isMainStateKey === true xay ra truoc, 1 cai isMainStateKey === false vo tinh xay ra sau => gay loi.
                        // TODO by CuongNT: VD: lay danh sach thread (1) + lay danh sach message cua thread selected (2). (2) xong truoc (1) se lam messagelist loi.
                        if (!itemIds ||
                            // CuongNT - 2/8/2018: comment lai dk nay, do list phu thi mac dinh khong xu ly itemIds luon.
                            // (!isMainStateKey && (isNewGreater || isNewChuaCur)) ||
                            (isMainStateKey && (getType === GET_LIST_TYPE.FIRST))) {
                            return objectIds.getIn([parentId, 'itemIds']);
                        }
                        if (
                            // CuongNT - 2/8/2018: comment lai dk nay, do list phu thi mac dinh khong xu ly itemIds luon.
                            // (!isMainStateKey && isNew2Cur) ||
                            (isMainStateKey && (getType === GET_LIST_TYPE.OLDER))) {
                            return itemIds.merge(objectIds.getIn([parentId, 'itemIds']));
                        }
                        if (
                            // CuongNT - 2/8/2018: comment lai dk nay, do list phu thi mac dinh khong xu ly itemIds luon.
                            // (!isMainStateKey && isCur2New) ||
                            (isMainStateKey && getType === GET_LIST_TYPE.NEWER)) {
                            return objectIds.getIn([parentId, 'itemIds']).merge(itemIds);
                        }
                        if (
                            (isMainStateKey && (getType === GET_LIST_TYPE.NEWEST))) {
                            if (_minScoreNew > _maxScoreCur) return objectIds.getIn([parentId, 'itemIds']);
                            return objectIds.getIn([parentId, 'itemIds']).merge(itemIds);
                        }
                        if (
                            (isMainStateKey && (getType === GET_LIST_TYPE.MID))) {
                            if (_maxScoreNew < _minScoreCur || _minScoreNew < _maxScoreCur) return objectIds.getIn([parentId, 'itemIds']);
                            if (_maxScoreNew > _maxScoreCur) return objectIds.getIn([parentId, 'itemIds']).merge(itemIds);
                            return itemIds.merge(objectIds.getIn([parentId, 'itemIds']));
                        }
                    }
                    // isCurGreater, isCurChuaNew
                    return itemIds;
                }).updateIn([_parentId, 'items'], (items) => {
                    if (isPost) {
                        if (items && objectIds.getIn([parentId, 'items'])) {
                            // CuongNT: Xu ly theo cach ghi de, do de lieu moi lay tu server ve
                            return items.withMutations((_items) => {
                                const _itemIds = objectIds.getIn([parentId, 'items']).entrySeq();
                                _itemIds.forEach((item) => {
                                    _items.setIn([item[0]], item[1]);
                                });
                            });
                            // CuongNT: Xu ly theo cach merge, co ve khong dung, comment tam lai
                            // return objectIds.getIn([parentId, 'items']).mergeDeep(items);
                        }
                        if (objectIds.getIn([parentId, 'items'])) {
                            return objectIds.getIn([parentId, 'items']);
                        }
                        if (items) {
                            return items;
                        }
                    } else if (isGetList) {
                        // TODO by CuongNT: Con tinh huong cung 1 itemIds, xong 1 cai update trong isMainStateKey === true xay ra truoc, 1 cai isMainStateKey === false vo tinh xay ra sau => gay loi.
                        // TODO by CuongNT: VD: lay danh sach thread (1) + lay danh sach message cua thread selected (2). (2) xong truoc (1) se lam messagelist loi.
                        if (
                            !items
                            // CuongNT - 2/8/2018: su dieu kien nay, do neu la list phu thi luon merge items moi nhat.
                            // || !isMainStateKey // || (!isMainStateKey && (isNewGreater || isNewChuaCur))
                            || (isMainStateKey &&
                            (getType === GET_LIST_TYPE.FIRST ||
                                (getType === GET_LIST_TYPE.NEWEST && _minScoreNew > _maxScoreCur) ||
                                (getType === GET_LIST_TYPE.MID && (_maxScoreNew < _minScoreCur || _minScoreNew < _maxScoreCur))
                            ))
                        ) {
                            // TODO: co loi CuongNTg phat hien khi xu ly lastRead, items da co du lieu do tinh toan. Xong request sau lay lai tu server ve va de vao cho nay gay ra loi.
                            // TODO by CuongNT: fix tam loi theo cach || Mapp().
                            return objectIds.getIn([parentId, 'items']) || Map();
                        }
                        if (
                            // CuongNT - 2/8/2018: su dieu kien nay, do neu la list phu thi luon merge items moi nhat.
                            !isMainStateKey || // (!isMainStateKey && (isNew2Cur || isCur2New)) ||
                            (isMainStateKey &&
                                (getType === GET_LIST_TYPE.OLDER || getType === GET_LIST_TYPE.NEWER) ||
                                (getType === GET_LIST_TYPE.NEWEST && !(_minScoreNew > _maxScoreCur)) ||
                                (getType === GET_LIST_TYPE.MID && !(_maxScoreNew < _minScoreCur || _minScoreNew < _maxScoreCur))
                            )
                        ) {
                            // TODO by CuongNT: sau nay anh Hieu sua bo may thong tin: role, permision... trong data ra ngoai dong cap voi data thi se back ve "Sua lan 2" la xong.
                            // HieuNVb - sua lan 3: Sua dap ung quy uoc data: {key1: abc, key2: def}; va moi lan update la chi de du lieu trong cac key1, key2.
                            return items.withMutations((item) => {
                                const _items = objectIds.getIn([parentId, 'items']);
                                if (_items) {
                                    const _itemsArr = _items.entrySeq();
                                    _itemsArr.forEach((_itemsAr) => {
                                        // TODO: cần xem lại chỗ này để chuẩn hóa cấu trúc có 'data' hay không có, đang fix tạm 2 trường hợp để chạy
                                        const roles = _itemsAr[1].getIn(['data', 'roles']);
                                        if (roles) {
                                            // HieuNVb: xử lý thêm một cấp đảm bảo ko đè lên dữ liệu không tồn tại ở cạnh khi server trả về
                                            const _itemsInData = _itemsAr[1].get('data').entrySeq();
                                            _itemsInData.forEach((_itemInData) => {
                                                item.setIn([_itemsAr[0], 'data', _itemInData[0]], _itemInData[1]);
                                            });
                                        } else {
                                            item.setIn([_itemsAr[0]], _itemsAr[1]);
                                        }
                                    });
                                }
                            });

                            // CuongNT - sua lan 2: Xu ly theo cach ghi de, do de lieu moi lay tu server v
                            // return items.withMutations(_items => {
                            //     const _itemIds = objectIds.getIn([parentId, 'items']).entrySeq();
                            //     _itemIds.forEach(item => {
                            //         _items.setIn([item[0]], item[1]);
                            //     });
                            // });

                            // CuongNT - sua lan 1: Xu ly theo cach merge, co ve khong dung, comment tam lai
                            // return items.mergeDeep(objectIds.getIn([parentId, 'items']));
                        }
                        // NamVH : Chưa thấy sự đồng bộ giữa các điều kiện item và itemIds. => do phần roles chưa được tối ưu nên đang fix tạm.
                        // sau này chuẩn sẽ tách các điều kiện ra để tương đồng với ItemIds.
                    }
                    // isCurGreater, isCurChuaNew
                    return items;
                }).updateIn([_parentId, 'minScore'], (minScore) => {
                    if (isPost) {
                        // TODO by CuongNT: khi post thi update lai minScore the nao
                    } else if (isGetList) {
                        // TODO by CuongNT: Con tinh huong cung 1 itemIds, xong 1 cai update trong isMainStateKey === true xay ra truoc, 1 cai isMainStateKey === false vo tinh xay ra sau => gay loi.
                        // TODO by CuongNT: VD: lay danh sach thread (1) + lay danh sach message cua thread selected (2). (2) xong truoc (1) se lam messagelist loi.
                        if (!minScore
                            // CuongNT - 2/8/2018: su dieu kien nay, do neu la list phu thi luon merge items moi nhat.
                            // || (!isMainStateKey && (isNewGreater || isNewChuaCur || isNew2Cur))
                            // TODO NamVH : Viết mô tả cho trường hợp get_MID và get_NEWEST.
                            || (isMainStateKey &&
                                (getType === GET_LIST_TYPE.FIRST
                                    || getType === GET_LIST_TYPE.OLDER
                                    || (getType === GET_LIST_TYPE.MID && (_minScoreNew < _minScoreCur || _minScoreNew > _maxScoreCur))
                                ))
                            || (getType === GET_LIST_TYPE.NEWEST && _minScoreNew > _maxScoreCur)
                        ) {
                            return objectIds.getIn([parentId, 'minScore']);
                        }
                    }
                    // isCurGreater, isCurChuaNew
                    return minScore;
                }).updateIn([_parentId, 'maxScore'], (maxScore) => {
                    if (isPost) {
                        // TODO by CuongNT: khi post thi update lai maxScore the nao
                    }
                    if (isGetList) {
                        // TODO by CuongNT: Con tinh huong cung 1 itemIds, xong 1 cai update trong isMainStateKey === true xay ra truoc, 1 cai isMainStateKey === false vo tinh xay ra sau => gay loi.
                        // TODO by CuongNT: VD: lay danh sach thread (1) + lay danh sach message cua thread selected (2). (2) xong truoc (1) se lam messagelist loi.
                        if (!maxScore
                            // CuongNT - 2/8/2018: su dieu kien nay, do neu la list phu thi luon merge items moi nhat.
                            // || (!isMainStateKey && (isNewGreater || isNewChuaCur || isCur2New))
                            // TODO NamVH : Viết mô tả cho trường hợp get_MID và get_NEWEST.
                            || (isMainStateKey &&
                                (getType === GET_LIST_TYPE.FIRST
                                    || getType === GET_LIST_TYPE.NEWER
                                    || (getType === GET_LIST_TYPE.MID && (_maxScoreNew > _maxScoreCur || _maxScoreNew < _minScoreCur))
                                ))
                            || (getType === GET_LIST_TYPE.NEWEST)
                        ) {
                            return objectIds.getIn([parentId, 'maxScore']);
                        }
                    }
                    // isCurGreater, isCurChuaNew
                    return maxScore;
                }).updateIn([_parentId, 'total'], (total) => {
                    // TODO : NamVH -> sửa lại để khi post thêm bài thì total tăng lên.
                    // TODO by CuongNT: Dang loi khi sua comment cung bi tang so total nay dan toi bao sai thong tin so comment
                    if (isPost) {
                        // doSomething.
                    }
                    const _total = (total === undefined) ? 0 : total;
                    return (objectIds.get(parentId).has('total')) ? (objectIds.getIn([parentId, 'total']) || _total) : (_total + 1);
                }).updateIn([_parentId, 'index'], (index) => objectIds.getIn([parentId, 'index']) || index).updateIn([_parentId, 'older204'], (older204) => {
                    // CuongNT: older204 reset lai ve false khi ma state bi reset theo ket qua vua lay tu server ve.
                    if (!older204
                        // || (!isMainStateKey && (isNewGreater || isNewChuaCur))
                        || (isMainStateKey && (getType === GET_LIST_TYPE.FIRST))) {
                        return false;
                    }
                    // isCurGreater, isCurChuaNew
                    return older204;
                });
                // } // (End 1.0)
            } else {
                stateTmp.set(_parentId, objectIds.get(parentId));
            }
        });
    });
};

/**
 * Goi khi xoa 1 object
 */
    // TODO: LinhLTf sửa tạm cho mục đích của bên pinApp: thêm searchStateKey
    // TODO NamVH : Tại sao bên ngoài không truyền vào mainStateKey, searchStateKeys, searchKey mà bên trong lại dùng.
const removeByEdge = (state, action) => {
    const {parentId, id} = action.payload;
    const {searchKey, mainStateKey, stateKey, searchStateKeys} = action.condition;
    const isMainStateKey = mainStateKey && mainStateKey === stateKey;
    const isSearchStateKey = searchStateKeys && searchStateKeys[stateKey];
    const _parentId = isMainStateKey
        ? searchKey || parentId
        : isSearchStateKey
            ? searchStateKeys[stateKey]
            : parentId;
    if (_parentId) {
        return state.withMutations((stateTmp) => stateTmp
            .updateIn([_parentId, 'itemIds'], (itemIds) => itemIds ? itemIds.filterNot((u) => u === id) : itemIds)
            .deleteIn([_parentId, 'items', id])
            .updateIn([_parentId, 'total'], (total) => total ? total - 1 : total)
        );
    }
    // TODO by CuongNT: De tam dieu kien nay, sau xet ki lai sau
    if (state.get(id)) {
        return state.delete(id);
    }
    const parentIds = state.keySeq().toArray();
    for (let i = 0; i < parentIds.length; i++) {
        if (state.getIn([parentIds[i], 'itemIds']).includes(id)) {
            // TODO by CuongNT: De tam lap code de debugger.
            return state.withMutations((stateTmp) => stateTmp.updateIn([parentIds[i], 'itemIds'], (itemIds) => itemIds ? itemIds.filterNot((u) => u === id) : itemIds)
                .deleteIn([parentIds[i], 'items', id])
                .updateIn([parentIds[i], 'total'], (total) => total ? total - 1 : total)
            );
        }
    }
    return state;
};

const removeAllByEdge = (state, action) => {
    const {parentId} = action.payload;
    return state.delete(parentId);
};

/**
 * Goi khi cap nhat du lieu trong items
 */
const updateByEdge = (state, action) => {
    const {data, parentId, id} = action.payload;
    const {searchKey, mainStateKey, stateKey, isPatch, searchStateKeys} = action.condition;
    const isMainStateKey = mainStateKey && mainStateKey === stateKey;
    const isSearchStateKey = searchStateKeys && searchStateKeys[stateKey];
    const _parentId = isMainStateKey
        ? searchKey || parentId
        : isSearchStateKey
            ? searchStateKeys[stateKey]
            : parentId;
    // TODO by CuongNT: Them tam vao de khi base nhan thi xu ly nhu la patch (dung mergeDeep, thay vi setIn)
    if (isPatch) {
        return state.updateIn([_parentId, 'items', id, 'data'], (_data) => _data ? _data.mergeDeep(data) : data);
    }
    return state.setIn([_parentId, 'items', id, 'data'], data);
};

const patchByEdge = (state, action) => {
    const {data, parentId, id} = action.payload;
    const {searchKey, mainStateKey, stateKey, searchStateKeys} = action.condition;
    const isMainStateKey = mainStateKey && mainStateKey === stateKey;
    const isSearchStateKey = searchStateKeys && searchStateKeys[stateKey];
    const _parentId = isMainStateKey
        ? searchKey || parentId
        : isSearchStateKey
            ? searchStateKeys[stateKey]
            : parentId;
    return state.updateIn([_parentId, 'items', id, 'data'], (_data) => _data ? _data.mergeDeep(data) : data);
};

const _add = (stateTmp, _parentId, id, data) => {
    stateTmp.has(_parentId)
        ? stateTmp.updateIn([_parentId, 'itemIds'], (itemIds) => itemIds ? OrderedSet([id]).merge(itemIds) : OrderedSet([id]))
        : stateTmp.setIn([_parentId, 'itemIds'], OrderedSet([id]));
    return stateTmp.setIn([_parentId, 'items', id, 'data'], data);
};

/**
 * Goi khi cap nhat du lieu trong items
 */
const addByEdge = (state, action) => {
    const {data, parentId, id} = action.payload;
    const {searchKey, mainStateKey, stateKey, searchStateKeys} = action.condition;
    const isMainStateKey = mainStateKey && mainStateKey === stateKey;
    const isSearchStateKey = searchStateKeys && searchStateKeys[stateKey];
    const _parentId = isMainStateKey
        ? searchKey || parentId
        : isSearchStateKey
            ? searchStateKeys[stateKey]
            : parentId;
    return state.withMutations((stateTmp) => _add(stateTmp, _parentId, id, data));
};

/**
 * Cap nhat Id moi do server tra ve sau khi tao moi 1 object
 */
const updateNewId = (state, action) => {
    const {parentId, id, offlineId} = action.payload;
    const {searchKey, mainStateKey, stateKey, searchStateKeys} = action.condition;
    const isMainStateKey = mainStateKey && mainStateKey === stateKey;
    const isSearchStateKey = searchStateKeys && searchStateKeys[stateKey];
    const _parentId = isMainStateKey
        ? searchKey || parentId
        : isSearchStateKey
            ? searchStateKeys[stateKey]
            : parentId;
    if (_parentId) {
        return state.withMutations((stateTmp) => {
            const item = stateTmp.getIn([_parentId, 'items', offlineId]);
            stateTmp
            // CuongNT - 9/8/2918: moi sua lai code cua DamBV cho nay. Neu phat sinh loi thi can trao doi lai
            // .updateIn([_parentId, 'itemIds'], (itemIds) => itemIds.map((_id) => _id === offlineId ? id : _id))
            // CuongNT: De tam cach lam duoi, cach lam tren gay ra OrderedSet co the add lap phan tu
                .updateIn([_parentId, 'itemIds'], (itemIds) => {
                    // TODO by CuongNT: Cach lam tren gay loi OrderedSet, dang fix tam cach duoi de cho thu vien immutablejs fix
                    const _itemIds = itemIds ? itemIds.toArray() : [];
                    const index = _itemIds.indexOf(offlineId);
                    _itemIds[index] = id;
                    return OrderedSet(_itemIds);
                })
                // TODO: Fix tạm trường hợp chat lần đầu tiên vào group mới, items trong userThreadIds bị set thành undefined
                .setIn([_parentId, 'items', id], item || fromJS({data: {}}));
        });
    }
    return state.withMutations((stateTmp) => {
        const edge = stateTmp.get(offlineId);
        stateTmp.set(id, edge);
    });
};

/**
 * Cap nhat dữ liệu cạnh
 */
const updateByListEdge = (state, action) => {
    const {data} = action.payload;
    let {parentId} = action.payload;
    parentId = parentId || data.keySeq().first();
    const {searchKey, mainStateKey, stateKey, searchStateKeys} = action.condition;
    const isMainStateKey = mainStateKey && mainStateKey === stateKey;
    const isSearchStateKey = searchStateKeys && searchStateKeys[stateKey];
    const _parentId = isMainStateKey
        ? searchKey || parentId
        : isSearchStateKey
            ? searchStateKeys[stateKey]
            : parentId;
    // TODO by CuongNT: Sao lai viet kieu nay?
    if (_parentId !== parentId) {
        parentId = data.keySeq().first();
    }
    // TODO by Dambv: Fix tam cho nay, sau chuan api update notify thi bo di sau:
    if (!data || !data.getIn([parentId, 'items'])) {
        return state;
    }
    return state.withMutations((st) => {
        const itemIds = data.getIn([parentId, 'items']).entrySeq();
        // Ghi đè dữ liệu các cạnh
        itemIds.forEach((item) => {
            // item[0]: id, item[1]: data
            // st.setIn([_parentId, 'items', item[0]], item[1]);
            // HieuNVb - duyệt vào cấp sâu thêm 1 cấp vì cấp đó mới chứa dữ liệu từng cạnh cần update, nếu update cấp ngoài sẽ mất dữ liệu cạnh khác
            const keys = item[1].get('data').entrySeq();
            keys.forEach((key) => {
                // key[0]: id, key[1]: data
                st.setIn([_parentId, 'items', item[0], 'data', key[0]], key[1]);
            });
        });
    });
};

const clear = () => new Map();

// CuongNT: update la update đè.
const _updateInfo = (state, _parentId, infoKey, infoData) => state.setIn([_parentId, infoKey], infoData);

const _patchInfo = (state, _parentId, infoKey, infoData) => state.updateIn([_parentId, infoKey], (_infoData) => _infoData ? _infoData.merge(infoData) : infoData);

const _addInfo = (state, _parentId, infoKey, infoData) => state.setIn([_parentId, infoKey], infoData);

const updateSearchParams = (state, action) => {
    const {parentId, searchParams = Map()} = action.payload;
    const {searchKey, mainStateKey, stateKey, searchStateKeys} = action.condition;
    const isMainStateKey = mainStateKey && mainStateKey === stateKey;
    const isSearchStateKey = searchStateKeys && searchStateKeys[stateKey];
    const _parentId = isMainStateKey
        ? searchKey || parentId
        : isSearchStateKey
            ? searchStateKeys[stateKey]
            : parentId;
    const oldSearchParams = state.getIn([_parentId, 'searchParams']) || Map();
    // CuongNT: kiem tra de, vd:
    // neu cu: {groupName: 'abc'}, moi: {groupName: 'abc'} => sau _pathInfo => updateIn
    // => merge se khong thay doi state nay => khong render lai ngoai y muon
    const isKeyEqual = oldSearchParams.keySeq().equals(searchParams.keySeq());
    return isKeyEqual
        ? _patchInfo(state, _parentId, 'searchParams', searchParams)
        : _updateInfo(state, _parentId, 'searchParams', searchParams);
};

const addSearchParams = (state, action) => {
    const {parentId, searchParams} = action.payload;
    const {searchKey, mainStateKey, stateKey, searchStateKeys} = action.condition;
    const isMainStateKey = mainStateKey && mainStateKey === stateKey;
    const isSearchStateKey = searchStateKeys && searchStateKeys[stateKey];
    const _parentId = isMainStateKey
        ? searchKey || parentId
        : isSearchStateKey
            ? searchStateKeys[stateKey]
            : parentId;
    return _addInfo(state, _parentId, 'searchParams', searchParams);
};

const updateInfo = (state, action) => {
    const {parentId, infoKey, infoData} = action.payload;
    const {searchKey, mainStateKey, stateKey, searchStateKeys} = action.condition;
    const isMainStateKey = mainStateKey && mainStateKey === stateKey;
    const isSearchStateKey = searchStateKeys && searchStateKeys[stateKey];
    const _parentId = isMainStateKey
        ? searchKey || parentId
        : isSearchStateKey
            ? searchStateKeys[stateKey]
            : parentId;
    return _updateInfo(state, _parentId, infoKey, infoData);
};

const addInfo = (state, action) => {
    const {parentId, infoKey, infoData} = action.payload;
    const {searchKey, mainStateKey, stateKey, searchStateKeys} = action.condition;
    const isMainStateKey = mainStateKey && mainStateKey === stateKey;
    const isSearchStateKey = searchStateKeys && searchStateKeys[stateKey];
    const _parentId = isMainStateKey
        ? searchKey || parentId
        : isSearchStateKey
            ? searchStateKeys[stateKey]
            : parentId;
    return _addInfo(state, _parentId, infoKey, infoData);
};

// TODO by CuongNT: Can bo sung co che khai bao reducer de chu dong hanlde cac cuc du lieu rieng (VD: itemIds cua threadMessageIds), thay vi phai tao file saga nay nhu hien tai.
const edgeReducer = createReducer(fromJS({}), {
    [EDGE_ACTIONS.ADD_LIST]: addListByEdge,
    [EDGE_ACTIONS.ADD]: addByEdge,
    [EDGE_ACTIONS.UPDATE]: updateByEdge,
    [EDGE_ACTIONS.PATCH]: patchByEdge,
    [EDGE_ACTIONS.REMOVE]: removeByEdge,
    [EDGE_ACTIONS.REMOVE_ALL]: removeAllByEdge,
    [EDGE_ACTIONS.UPDATE_LIST]: updateByListEdge,
    [EDGE_ACTIONS.UPDATE_NEW_ID]: updateNewId,
    [EDGE_ACTIONS.CLEAR]: clear,
    // TODO by CuongNT: chuyen searchParams ra khoi state do khong lien quan toi render giao dien, ma chi lien quan toi khi truy van len server.
    // TODO by CuongNT: maxScore, minScore, limit tuong tu.
    [EDGE_ACTIONS.UPDATE_SEARCH_PARAMS]: updateSearchParams,
    [EDGE_ACTIONS.ADD_SEARCH_PARAMS]: addSearchParams,
    [EDGE_ACTIONS.UPDATE_INFO]: updateInfo,
    [EDGE_ACTIONS.ADD_INFO]: addInfo,
});

export default edgeReducer;

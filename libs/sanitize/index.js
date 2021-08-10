/**
 * Sanitize Module
 * @module Sanitize 
 * */

const userTypes = {
    firstName: 'string',
    lastName: 'string'
}

const authTypes = {
    email: 'string',
    password: 'string'
}

const publicTypes = {
    ...userTypes,
    email: 'string'
}

/** @param {string} types */
const matchTypes = (types = 'all') => {
    let dataTypes = {}

    switch (types) {
        case 'all':
            dataTypes = {...authTypes, ...userTypes}
            break;
        case 'auth':
            dataTypes = {...authTypes}
            break;
        case 'users':
            dataTypes = {...userTypes}
            break;
        case 'public':
            dataTypes = {...authTypes, ...userTypes}
            delete dataTypes.password
            break;
        default:
            break;
    }

    return dataTypes

}

/**
 * Function to check data consistency. It will throw an error if there
 * are any unmatched types.
 * @param {Data} data
 * @param {string} types
 * @returns {Data}
 */
const dataSanitizer = (data, types = 'all') => {
    let dataTypes = matchTypes(types)
    for (const key in dataTypes) {
        if (!data[key] || typeof data[key] !== dataTypes[key]) {
            throw {status: 400, error: "Data is malformed"}
        }
    }
    return data
}

/**
 * Function should be used during runtime to ensure data is consistent.
 * @typedef FilteredData
 * @property {string} [email]
 * @property {string} [firstName]
 * @property {string} [lastName]
 * 
 * @param {Data} data
 * @returns {FilteredData}
 */
const publicDataSanitizer = (data) => {
    let dataTypes = matchTypes('public')
    let filteredData = {}
    for (const key in data) {
        if (dataTypes[key]) {
            if (typeof data[key] !== dataTypes[key]) {
                throw {status: 400, error: "Data is malformed"}
            }
            filteredData[key] = data[key]
        }
    }

    return filteredData
}

module.exports = {
    dataSanitizer,
    publicDataSanitizer
}
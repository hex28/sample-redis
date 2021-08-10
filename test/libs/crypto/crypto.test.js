const { randomString } = require("../../../libs/crypto");

test('random string will return type string', () => {
    let str = randomString(15)
    expect(typeof str).toBe('string')
}) 

test('random string will be length 15', () => {
    let str = randomString(15)
    expect(str).toHaveLength(15)
})
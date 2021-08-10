const {dataSanitizer, publicDataSanitizer} = require('../../../libs/sanitize')

describe('Data Sanitizer', () => {
    test('will pass through data that is matched to data sanitizer', () => {
        let authObj = {
            "email": "test@gmail.com",
            "password": "TEST123"
        }
        expect(dataSanitizer(authObj, 'auth')).toEqual(authObj)
    }) 

    test('will accept extra properties if object meets minimum requirements for sanitization types', () => {
        let authObj = {
            "email": "test@gmail.com",
            "password": "TEST123",
            "firstName": "Adam",
            "lastName": "Lazzara"
        }
        expect(dataSanitizer(authObj, 'auth')).toEqual(authObj)
    }) 

    test('will throw error if a property does not meet type requirements', () => {
        let authObj = {"email": "test@gmail.com", "password": true}
        expect(() => dataSanitizer(authObj)).toThrow()
    })
})


describe('Public Data Sanitizer', () => {

    let nameObj = {
        firstName: 'Julian',
        lastName: 'Casablancas',
    }

    let passwordObj = {password: 'test'}

    test('will remove passwords if it is within the object', () => {
      expect(publicDataSanitizer({...nameObj, ...passwordObj})).toEqual(expect.not.objectContaining(passwordObj));
    });

    test('will throw err if property has the wrong type', () => {
        expect(() => publicDataSanitizer({...nameObj, firstName: 1})).toThrow();
    })

    test('will pass along data that has no issues', () => {
        expect(publicDataSanitizer(nameObj)).toEqual(nameObj)
    })
  
});
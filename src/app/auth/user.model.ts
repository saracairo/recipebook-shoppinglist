export class User {
    constructor(
        public email: string,
        public id: string,
        // accessibili solo tramite getter:
        private _token: string,
    private _tokenExpirationDate: Date
    ) { }

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
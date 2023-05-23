export class Email {
    constructor(
        public recipient : String = "",
        public msgBody : String = "",
        public subject : String = "",
        public attachment : String = ""
    ) { }
}
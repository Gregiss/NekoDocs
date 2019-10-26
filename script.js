String.prototype.isABC = function() {
    var a = this,
        ab = "abcdefghijklmnopqrstuvwxyz,.[] {}1234567890´''àáóòê()",
        ab2 = ab.toUpperCase(),
        ab3 = '"":´><';
    for (i = 0; i < ab.length; i++) { if (ab.charAt(i) == a || ab2.charAt(i) == a || ab3.charAt(i) == a) { return true; } }
    return false;
}

var app = new Vue({
    el: "#app",
    data: {
        reg: /[a-zA-Z\u00C0-\u00FF ]+/i,
        document: {"name": "Documento sem título", "text": []},
        options: [
            {'name' :'Desfazer', 'icon': 'fas fa-undo'},
            {'name' :'Refazer', 'icon': 'fas fa-redo'}
        ],
        documentOptions: {"fontSize": 16, 'color': 'black', 'style': 'normal'},
        lastKey: null,
        digitando: 0
    },
    created() {
        window.addEventListener('keydown', (e) => {
            if (e.key.isABC()) {
                this.editar(e.key)
            }
            if (e.key == ' ') {
                this.editar(e.key)
            }
            if (e.key == 'Backspace') {
                this.document.text.splice(-1, 1)
                if(this.document.text.length > 0){
                this.lastKey = this.document.text[this.document.text.length - 1]
                } else{
                    this.lastKey = 'blank'
                }
                console.log(this.lastKey)
            }
        });
    },
    mounted() {
        
    },
    methods: {
        editar(letter) {
        this.document.text.push({
                'letter': letter,
                'style': this.documentOptions.style,
                'size': this.documentOptions.fontSize,
                'color': this.documentOptions.color
        })
        this.digitando = this.document.text.length - 1
        this.lastKey = this.document.text[this.document.text.length - 1]
        },
        onde(letter){
            var index = this.document.text.indexOf(letter)
            this.lastKey = this.document.text[index]
            this.digitando = index
        }
    }
});
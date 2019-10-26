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
        documentOptions: {"fontSize": 16, 'color': 'black', 'style': 'normal', 'zoom': '1', 'fontFamiliy': 'Arial, Helvetica, sans-serif'},
        lastKey: null,
        digitando: -1,
        theme: 'light',
        editando: false
    },
    created() {
        window.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowLeft'){
                if(this.digitando > 0 ){
                    this.digitando--
                    this.lastKey = this.document.text[this.digitando]
                }
            }
            if(e.key == 'ArrowRight'){
                if(this.digitando < this.document.text.length - 1){
                    this.digitando++
                    this.lastKey = this.document.text[this.digitando]
                }
            }
            if(e.key == 'Dead'){
                this.darkMode()
            }
            if(e.key == 'End'){
                this.digitando = this.document.text.length - 1
                this.lastKey = this.document.text[this.document.text.length - 1]
            }
            if(e.key == 'Home'){
                this.digitando = 0
                this.lastKey = this.document.text[0]
            }
            if (e.key.isABC()) {
                this.editar(e.key)
            }
            if (e.key == ' ') {
                this.editar(e.key)
            }
            if (e.key == 'Backspace') {
                if(this.digitando === this.document.text.length - 1 || this.digitando === -1){
                if(this.document.text.length > 0){
                this.document.text.splice(-1, 1)
                this.lastKey = this.document.text[this.document.text.length - 1]
                } else{
                    this.lastKey = 'blank'
                }
            } else{
                this.document.text.splice(this.digitando, 1)
                if(this.document.text.length == 1){
                    this.digitando = -1
                    this.lastKey = this.document.text[this.document.text.length - 1]
                } else{
                    this.digitando--
                    this.lastKey = this.document.text[this.digitando]
                }
            }
            }
        });
    },
    mounted() {
        
    },
    methods: {
        darkMode(){
            if(this.theme === 'light'){
                this.document.color = 'white'
                this.documentOptions.color = 'white'
                this.theme = 'dark'
                for(var i = 0; i < this.document.text.length; i++){
                    this.document.text[i].color = 'white'
                }
            } else{
                this.theme = 'light'
              this.documentOptions.color = 'dark'
                for(var i = 0; i < this.document.text.length; i++){
                    this.document.text[i].color = 'black'
                }
                this.document.color = 'black'
            }
        },
        insertAt(array, index) {
            var arrayToInsert = Array.prototype.splice.apply(arguments, [2]);
            return this.insertArrayAt(array, index, arrayToInsert);
        },
        insertArrayAt(array, index, arrayToInsert) {
            Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
            return array;
        },
        editar(letter) {
        if(this.digitando === this.document.text.length - 1 || this.digitando == -1){
        this.document.text.push({
                'letter': letter,
                'style': this.documentOptions.style,
                'size': this.documentOptions.fontSize,
                'color': this.documentOptions.color,
                'font': this.documentOptions.fontFamiliy
        })
        this.lastKey = this.document.text[this.document.text.length - 1]
        this.digitando = this.document.text.length - 1
        } else{
            console.log(letter)
            var arr = {
                'letter': letter,
                'style': this.documentOptions.style,
                'size': this.documentOptions.fontSize,
                'color': this.documentOptions.color,
                'font': this.documentOptions.fontFamiliy
            }
            this.digitando++
            this.insertArrayAt(this.document.text, this.digitando, arr);
            this.lastKey = this.document.text[this.digitando]
        }
        },
        onde(letter){
            var index = this.document.text.indexOf(letter)
            this.lastKey = this.document.text[index]
            this.digitando = index
        }
    }
});

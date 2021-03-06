


Vue.component('myheader', {
    template: 
    `
        <div>

            <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div class="container">
                    <a class="navbar-brand" href="index.html">DULCEKAT</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="oi oi-menu"></span> Menu
                    </button>

                    <div class="collapse navbar-collapse" id="ftco-nav">
                        <ul class="navbar-nav ml-auto">
                        <li class="nav-item active"><a href="index.html" class="nav-link">Inicio</a></li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">PRODUCTOS</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown04">
                            <a class="dropdown-item" href="productoCategoria.html" @click='setCategoria(cat.id_categoria)' v-for="cat in categoria">{{cat.nomb_categoria}}</a>

                        </div>
                        </li>
                        <li class="nav-item"><a href="about.html" class="nav-link">Nosotros</a></li>
                        <li class="nav-item"><a href="blog.html" class="nav-link">Contactanos</a></li>

                        <template v-if=" userdb === null ">
                            <li class="nav-item" ><a href="login.html" class="nav-link"><img src="images/avatar.png" width="18"></a></li>
                            <li class="nav-item cta cta-colored"><a href="cart.html" class="nav-link"><span class="icon-shopping_cart"></span>[{{ shopListLen }}]</a></li>
                        </template>
                        <template v-else>
                            <li class="nav-item"><a href="#" class="nav-link">{{userdb.nombre}}</a></li>
                            <li class="nav-item cta cta-colored"><a href="cart.html" class="nav-link"><span class="icon-shopping_cart"></span>[ {{ shopListLen }}]</a></li>
                        </template>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    `,
    props: ['lista'],
    data(){

        console.log('this.lista', this.lista)
        return {
            categoria: [],
            userdb: {},
            categoryide: 0,
            isLoggeed: false,
            shopList: this.lista || [],
            shopListLen: this.lista ? this.lista.reduce((acc, obj) => { return acc + obj.nro_productos; }, 0) : 0
        }
    },      
    watch: { 
        lista: function(newVal, oldVal) { // watch it
            this.shopList = newVal;
            this.shopListLen = this.lista.reduce((acc, obj) => { return acc + obj.nro_productos; }, 0)
        }
    },
    methods:{
        loadCategory(){
            fetch('http://127.0.0.1:8000/api/getListCategoria')
					.then(response=>{
						return response.json()
					})
					.then(data=>{
                        this.categoria = data;
					});
        },
        loadUserDate(){
            let data = localStorage.getItem('usuario')
            
            if(data === null || data === "undefined"){
                this.userdb = null
            }else{
                let usuario = JSON.parse(data)
                usuario = usuario[0]

                this.userdb.nombre = usuario.nomb_usuario
                
            }
        },
        setCategoria(i){
            localStorage.setItem('idcategoria',i);
        }
    },
    created(){
        this.loadCategory()
        this.loadUserDate()
    }
})
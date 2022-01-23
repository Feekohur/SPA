let vm = new Vue({
    el: '#app',
    data: {
        message: "Hello world!",
        Id: "",
        Imię: "",
        Nazwisko: "",
        Wiek: "",
        Data_urodzenia: "",
        uczestnicy:[
            {id:1, imię:"Jan", nazwisko:"Nowak", wiek:40, data_urodzenia:'01-01-1982'},
            {id:2, imię:"Michał", nazwisko:"Król", wiek:21, data_urodzenia:'31-05-2000'},
            {id:3, imię:"Robert", nazwisko:"Mateja", wiek:47, data_urodzenia:'05-10-1974'},
            {id:4, imię:"Adam", nazwisko:"Nawałka", wiek:64, data_urodzenia:'23-10-1957'},
            {id:5, imię:"Max", nazwisko:"Verstappen", wiek:24, data_urodzenia:'30-09-1997'}
        ]
        
    },
    methods: {
        add() {
          this.uczestnicy.push({
            id: this.Id,  
            imię: this.Imię,
            nazwisko: this.Nazwisko,
            wiek: this.Wiek,
            data_urodzenia: this.Data_urodzenia
          })
          this.Id = ""
          this.Imię = ""
          this.Nazwisko = ""
          this.Wiek = ""
          this.Data_urodzenia = ""
        }
      }

   })
   
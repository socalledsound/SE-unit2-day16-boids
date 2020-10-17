class App extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        partyType: "birthday",
        entertainment: "clowns",
        venue: {
          name: "Polly's Party Palace",
          capacity: 120
        },
        guests: [
          {
            id:0,
            name:"Chris"
          }, 
          {
            id:1,
            name:"Angie"
          }, 
          {
            id:2,
            name:"Tom"
          },
          {
            id:3,
            name:"Drew"
          }
        ]
      };
    }
      
    render() {
      return (
        <div>
          hi
          <Party {...this.state}/>
        </div>
      );
    }
  }
  

function Riotgamesapi() {
  let api_key = 'RGAPI-b7bec633-ee5b-481f-a0ef-2bef22fb2ab3';
  let imageUrl = '';
  let imageElement = null;

  const search = async () => {
    let ChampionName = document.getElementsByClassName('champ-name');
    const Name = document.getElementsByClassName('Name');
    const Partype = document.getElementsByClassName('Par-type');
    const lore = document.getElementsByClassName('lore');
    const testoElement = document.querySelector('.testo');
    const title = document.getElementsByClassName('title');
    

    if (ChampionName[0].value === "") {
      return 0;
    }

    let url = `https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion/${ChampionName[0].value}.json?api_key=${api_key}`;
    imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${ChampionName[0].value}_0.jpg`;

    let response;
    try {
      response = await fetch(url);
    } catch (error) {
      console.log("Error fetching champion data:", error);
      Name[0].innerHTML = "Error fetching champion ";
      return;
    }

    let dataM;
    try {
      dataM = await response.json();
    } catch (error) {
      console.log("Error parsing JSON:", error);
      Name[0].innerHTML = "Champion Dosent Exsist";
      Partype[0].innerHTML = ""
      title[0].innerHTML = ""
      lore[0].innerHTML =""
      

      return;
    }

    console.log(dataM);

    if (!dataM.data[ChampionName[0].value]) {
      Name[0].innerHTML = "This champ doesn't exist";
 
  }

    console.log(imageUrl);
    Name[0].innerHTML = `Champion Name : ${dataM.data[ChampionName[0].value].name}`
    Partype[0].innerHTML = `Par-type : ${dataM.data[ChampionName[0].value].partype}`
    title[0].innerHTML = `Title : ${dataM.data[ChampionName[0].value].title}`
    lore[0].innerHTML = dataM.data[ChampionName[0].value].lore
    if (imageElement) {
      testoElement.removeChild(imageElement);
    }

    imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    testoElement.appendChild(imageElement);
  };

  return (
    <div className="container">
      <div className="app-container">
        <span>Seach Your Champion</span>
      <input className='champ-name' placeholder="Ahri , Akali , TwistedFate , etc.."></input>
      <button onClick={() => { search() }}>Search</button>
      <div className="data-container">
      <div className="testo"></div>
      <div className="flexo">
      <h1 className='Name'></h1>
      <h1 className="Par-type"></h1>
      <h1 className="title"></h1>
      </div> 
      </div>
      <h2 className="lore"></h2>
    </div>
    </div>
  );
}

export default Riotgamesapi;
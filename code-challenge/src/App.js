import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import YourBotArmy from "./components/YourBotArmy";
import BotCollection from "./components/BotCollection";
import "./App.css";

function App() {
  const [enlistedBots, setEnlistedBots] = useState([]);

  useEffect(() => {
    async function fetchEnlistedBots() {
      const response = await fetch("http://localhost:3000/bots?enlisted=true");
      const data = await response.json();
      setEnlistedBots(data);
    }
    fetchEnlistedBots();
  }, []);

  const handleEnlistBot = (bot) => {
    setEnlistedBots((prevBots) => [...prevBots, bot]);
  };

  const handleReleaseBot = (bot) => {
    setEnlistedBots((prevBots) =>
      prevBots.filter((enlistedBot) => enlistedBot.id !== bot.id)
    );
  };

  const handleDischargeBot = (id) => {
    setEnlistedBots((prevBots) =>
      prevBots.filter((enlistedBot) => enlistedBot.id !== id)
    );
  };

  const handleCreateBot = (bot) => {
    setEnlistedBots((prevBots) => [...prevBots, bot]);
  };

  return (
    <Router>
      <div>
        <Nav enlistedBots={enlistedBots} />
        <Switch>
          <Route exact path="/">
            <h1>Welcome to My App</h1>
          </Route>
          <Route path="/bot-collection">
            <BotCollection
              enlistedBots={enlistedBots}
              onEnlistBot={handleEnlistBot}
              onCreateBot={handleCreateBot}
            />
          </Route>
          <Route path="/your-bot-army">
            <YourBotArmy
              enlistedBots={enlistedBots}
              onReleaseBot={handleReleaseBot}
              onDischargeBot={handleDischargeBot}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";

function YourBotArmy({ onReleaseBot, onDischargeBot }) {
  const [bots, setBots] = useState([]);

  useEffect(() => {
    async function fetchBots() {
      const response = await fetch("http://localhost:3000/bots");
      const data = await response.json();
      setBots(data);
    }
    fetchBots();
  }, []);
  

  const handleReleaseBot = async (id) => {
    const response = await fetch(`http://localhost:3000/bots/${id}/release`, {
      method: "PUT",
    });
    if (response.ok) {
      const updatedBot = await response.json();
      setBots((prevBots) => prevBots.filter((bot) => bot.id !== updatedBot.id));
      onReleaseBot(updatedBot);
    }
  };

  const handleDischargeBot = async (id) => {
    const response = await fetch(`http://localhost:3000/bots/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setBots((prevBots) => prevBots.filter((bot) => bot.id !== id));
      onDischargeBot(id);
    }
  };

  return (
    <div>
      <h2>Your Bot Army</h2>
      <ul>
        {bots.map((bot) => (
          <li key={bot.id} className="enlisted">
            <span>{bot.name}</span>
            <span>{bot.health}</span>
            <span>{bot.damage}</span>
            <span>{bot.armor}</span>
            <span>{bot.bot_class}</span>
            <span>{bot.catchphrase}</span>
            <button onClick={() => handleReleaseBot(bot.id)}>Release</button>
            <button onClick={() => handleDischargeBot(bot.id)}>Discharge</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YourBotArmy;

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
          <div key={bot.id} className="army-card">
            <img src={`${bot.avatar_url}`} alt={`${bot.bot_class}`} />
              <div className="bot-details">
              <ul>
              <li><span className="bot-name">Name:{bot.name}</span></li>
              <li><span className="bot-health">Health:{bot.health}</span></li>
              <li><span className="bot-damage">Damage:{bot.damage}</span></li>
              <li><span className="bot-armor">Armor:{bot.armor}</span></li>
              <li><span className="bot-class">Class:{bot.bot_class}</span></li>
              <li><span className="bot-catchphrase">Catchphrase:{bot.catchphrase}</span></li>
              </ul>

              <button onClick={() => handleDischargeBot(bot.id)}>Discharge</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default YourBotArmy;

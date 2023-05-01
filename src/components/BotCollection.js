import React, { useEffect, useState } from "react";

function BotCollection({ onEnlistBot, onCreateBot }) {
  const [bots, setBots] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [health, setHealth] = useState("");
  const [damage, setDamage] = useState("");
  const [armor, setArmor] = useState("");
  const [botClass, setBotClass] = useState("");
  const [catchphrase, setCatchphrase] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    async function fetchBots() {
      const response = await fetch("http://localhost:3000/bots");
      const data = await response.json();
      setBots(data);
    }
    fetchBots();
  }, []);

  const handleEnlistBot = async (id) => {
    const response = await fetch(`http://localhost:3000/bots/${id}/enlist`, {
      method: "PUT",
    });
    if (response.ok) {
      const updatedBot = await response.json();
      setBots((prevBots) =>
        prevBots.map((bot) =>
          bot.id === updatedBot.id ? { ...bot, enlisted: "true" } : bot
        )
      );
      onEnlistBot(updatedBot);
    }
  };

  const handleCreateBot = async () => {
    const response = await fetch("http://localhost:3000/bots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        health,
        damage,
        armor,
        bot_class: botClass,
        catchphrase,
        avatar_url: avatarUrl,
      }),
    });
    if (response.ok) {
      const newBot = await response.json();
      setBots((prevBots) => [...prevBots, newBot]);
      onCreateBot(newBot);
      setShowForm(false);
      setName("");
      setHealth("");
      setDamage("");
      setArmor("");
      setBotClass("");
      setCatchphrase("");
      setAvatarUrl("");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleCreateBot();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };


return (
<div>
<h2>Bot Collection</h2>
<button onClick={() => setShowBotForm(true)}>Create New Bot</button>
{showBotForm && (
<div>
<form onSubmit={handleCreateBot}>
<label>
Name:
<input type="text" name="name" onChange={handleInputChange} />
</label>
<br />
<label>
Health:
<input type="number" name="health" onChange={handleInputChange} />
</label>
<br />
<label>
Damage:
<input type="number" name="damage" onChange={handleInputChange} />
</label>
<br />
<label>
Armour:
<input type="number" name="armor" onChange={handleInputChange} />
</label>
<br />
<label>
Bot Class:
<input type="text" name="bot_class" onChange={handleInputChange} />
</label>
<br />
<label>
Catchphrase:
<input type="text" name="catchphrase" onChange={handleInputChange} />
</label>
<br />
<label>
Avatar Image:
<input type="text" name="avatar_url" onChange={handleInputChange} />
</label>
<br />
<button type="submit">Create Bot</button>
<button type="button" onClick={() => setShowBotForm(false)}>Cancel</button>
</form>
</div>
)}
<div className="bot-card">
{bots.map((bot) => (
<li key={bot.id}>
<img src={$`{bot.avatar_url}`} alt={$`{bot.bot_class}`} />
<span>{bot.name}</span>
<span>{bot.health}</span>
<span>{bot.damage}</span>
<span>{bot.armor}</span>
<span>{bot.bot_class}</span>
<span>{bot.catchphrase}</span>
{bot.enlisted ? (
<button disabled>Enlisted</button>
) : (
<button onClick={() => handleEnlistBot(bot.id)}>Enlist</button>
)}
</li>
))}
</div>
</div>
);
};

export default BotCollection;
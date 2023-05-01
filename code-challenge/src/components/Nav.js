import React from "react";
import { Link } from "react-router-dom";

function Nav({ enlistedBots }) {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bot-collection">Bot Collection</Link>
          </li>
          <li>
            <Link to="/your-bot-army">Your Bot Army</Link>
          </li>
          <li>
            <Link
              to="/bot-collection"
              onClick={() => window.scrollTo(0, 0)}
            >
              Bot Collection Start
            </Link>
          </li>
          <li>
            <Link
              to="/your-bot-army"
              onClick={() => window.scrollTo(0, 0)}
            >
              Your Bot Army Start
            </Link>
          </li>
        </ul>
        <p>Enlisted Bots: {enlistedBots.length}</p>
      </nav>
    );
  }

export default Nav;

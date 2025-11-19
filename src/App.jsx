import Header from "./Header";

/* useState est une fonction native de react qu'il faut importer en debut de page pour l'utiliser par la suite */
import { useState } from "react";

function Square({ value, onSquareClick }) {
  /* La fonction Square utilise les prop value et onSquareClick qui sont definis eux meme dans la fonction tableau */
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
    /* button represente ici une case cliquable. Le click sur la case declenche l'execution de la fonction onSquareClick, et affiche value. */
  );
}

export default function Tableau() {
  const [tourJoueurX, settourJoueurX] = useState(true);
  /*on stock la valeur true dans la variable tourJoueurX, et onn nomme settourJoueurX la fonction qui permet de rafraichir cette valeur */
  const [squares, setSquares] = useState(Array(9).fill(null));
  /* ici on cré un tableau de 9 cases dont les valeurs initiales sont toute nul et sotcké dans la variable squares*/

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    /* if (squares[i]) signifie : si la case n'est pas vide (null). En d'autre terme, si un joueur a deja joué.
    Return, a l'interieur d'une fonction, interromp l'execution de celle ci. 
    Donc si case deja joué, interrompt la fonction handleClick. Cela empêche que X ou O écrase la valeur existante.
     */
    const nextSquares = squares.slice();
    /* slice permet de creer une copie de la variable-tableau "squares" qui contient 9 valeurs. Cette copie est stocké dans la variable nextSquares */
    if (tourJoueurX) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    /* Ici, [i] renvoi a n'importe quel case du jeu que l'on peut ensuite selectionner en remplacant i par la valeur de la case [0];[1],[2]]... */
    setSquares(
      nextSquares
    ); /* Ici, la fonction setSquares indique a react de rafraichir les composants pour prendre en compte la copie du tableau squares que l'on a nommé nextSquares. */

    settourJoueurX(!tourJoueurX);
  }

  const winner = calculateWinner(squares);
  // calcul pour connaitre le gagnant stoké dans la variable winner
  let status; // contient le message a afficher
  if (winner) {
    // si il y a un gagnant
    status = winner + " a gagné";
    /* le msg a afficher est nom du gagnant + a gagné */
  } else {
    status = "Prochain tour : " + (tourJoueurX ? "X" : "O");
    /* cette syntaxe : (tourJoueurX ? "X" : "O") est une abreviation de la condition : 
    Si xIsNext est vrai → 'X'Sinon → 'O' */
  }

  /* Ici, on affiche dans le navigateur 3 lignes de 3 cases qui sont representé par la fonction Square avec ses props :
     - value renvoie donc a squares [i]
     - onSquareClick execute la fonction handleClick(i) */

  return (
    <>
      <Header />
      <div className="jeu-container">
        <div className="status">{status}</div>
        <div className="ligne-tableau">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="ligne-tableau">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="ligne-tableau">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

/*Ici, la fonction qui contient le calcul et le resulat pour definir le gagnant */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Tabela komponenta
function Tabela({ headeri, podaci }) {
  return (
    <table>
      <thead>
        <tr>
          {headeri.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {podaci.map((red) => (
          <tr key={red.id}>
            {red.stupci.map((stupac) => (
              <td key={stupac.kljuc}>{stupac.vrijednost}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Chart komponenta (potrebna externa biblioteka)
function Chart({ podaci }) {
  // ... (renderiranje charta pomoću biblioteke)
}

// Map komponenta (potrebna externa biblioteka)
function Map({ lokacija, zum }) {
  // ... (renderiranje mape pomoću biblioteke)
}

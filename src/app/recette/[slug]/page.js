import React from 'react';

async function RecipePage({params}) {

  console.log(await params);

    return (
    <div>
      <p>Page Test</p>
    </div>
  );
}

export default RecipePage;
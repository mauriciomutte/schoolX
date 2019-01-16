// Location
const dirMatter = '../../matter.json'
const dirMatterContent = '../../conteudo/segundo.json'
const dirTests = '../../tests.json'

// createTestTable
function createTestTable() {
  const require = new XMLHttpRequest()
  require.open("GET", dirTests, true)
  require.onload = function() {
    const tests = JSON.parse(this.responseText)

    function compare(a, b) {
      const dateA = new Date(a.date + ', 2018') 
      const dateB = new Date(b.date + ', 2018') 
    
      if (dateA > dateB) {
        return comparison = 1;
      } else if (dateA < dateB) {
        return comparison = -1;
      }
    }
    tests.sort(compare);

    const require = new XMLHttpRequest()
    require.open("GET", dirMatter, true)
    require.onload = function() {
      const matter = JSON.parse(this.responseText)
      const test = [
        matter.arte, 
        matter.biologia, 
        matter.educacaoFisica,
        matter.filosofia,
        matter.fisica, 
        matter.geografia, 
        matter.historia, 
        matter.linguaEspanhola,
        matter.linguaInglesa, 
        matter.linguaPortuguesa, 
        matter.literatura, 
        matter.matematica, 
        matter.quimica, 
        matter.redacao, 
        matter.sociologia
      ]

      tests.forEach(function(item) {
        const dateNow = new Date()
        const dateToday = new Date(2018, dateNow.getMonth(),dateNow.getDate())
        const datePlusAWeek = new Date(2018, dateNow.getMonth(),dateNow.getDate() + 7) 
        const date = new Date(item.date + ', 2018')
        const dateMonth = date.getMonth()
        let dateDay = date.getDate()
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        function createTestCard(render) {
          const testPage = document.querySelector('.' + render)
  
          const testContent = document.createElement('div')
          testContent.classList.add('test__content')
          testContent.style.backgroundColor = test[item.matter].color
          testPage.appendChild(testContent)
        
          const testDate = document.createElement('div')
          testDate.classList.add('test__date')
          testContent.appendChild(testDate)
        
          const testDateDay = document.createElement('span')
          testDateDay.classList.add('test__date__day')
          testDateDay.innerHTML = dateDay
          testDate.appendChild(testDateDay)
        
          const testDateMonth = document.createElement('span')
          testDateMonth.classList.add('test__date__month')
          testDateMonth.innerHTML = months[dateMonth].toUpperCase()
          testDate.appendChild(testDateMonth)
        
          const testInfo = document.createElement('div')
          testInfo.classList.add('test__info')
          testContent.appendChild(testInfo)
        
          const testMatterName = document.createElement('a')
          testMatterName.classList.add('test__matterName')
          testMatterName.innerHTML = test[item.matter].name
          testMatterName.href = '../' + test[item.matter].dir
          testInfo.appendChild(testMatterName)
        
          const testMatterTest = document.createElement('p')
          testMatterTest.classList.add('test__matterTest')
          testMatterTest.innerHTML = item.test
          testInfo.appendChild(testMatterTest)
        }
        
        if (dateDay < 10) {
          dateDay = '0' + dateDay
        }

        if (date >= dateToday) {
          if (date < datePlusAWeek) {
            createTestCard('tests__next-tests')
          } else {
            createTestCard('tests__other-tests')
          }
        }
      })
    }
    require.send()
  }
  require.send()
}

//ConteudoX
function matterList(trimestre, materia) {
  const list = document.querySelector('.' + materia +'-lista')

  const divList = document.createElement('div')
  divList.classList.add('lista__trimestre')
  list.appendChild(divList)

  const h2List = document.createElement('h2')
  h2List.classList.add('lista__trimestre--title')
  h2List.innerHTML = trimestre.title
  divList.appendChild(h2List)

  const trimestreLista = document.createElement('ul')
  trimestreLista.classList.add('lista__trimestre__conteudo--ul')
  divList.appendChild(trimestreLista)

  trimestre.content.forEach(function(item) {
    console.log(item)
    const conteudo = document.createElement('li')
    conteudo.classList.add('lista__trimestre__conteudo--li')
    conteudo.innerHTML = item
    trimestreLista.appendChild(conteudo)
  })
}

function callJSON(m, materia, ano) {
  const require = new XMLHttpRequest()
  require.open("GET", '/schoolX/conteudo/' + ano + '.json', true)
  require.onload = function() {
    const matter = JSON.parse(this.responseText)
    const test = [
      matter.arte, 
      matter.biologia, 
      matter.edf,
      matter.filosofia,
      matter.fisica, 
      matter.geografia, 
      matter.historia, 
      matter.espanhol,
      matter.ingles, 
      matter.portugues, 
      matter.literatura, 
      matter.matematica, 
      matter.quimica, 
      matter.redacao, 
      matter.sociologia
    ]

    matterList(test[m].firstTri, materia)
    matterList(test[m].secondTri, materia)
    matterList(test[m].thirdTri, materia)
  }
  require.send()
}
const select1 = document.querySelectorAll("select")[0]
const select2 = document.querySelector("#result3")

const products = []

let i = 0

function changeSelect1() {
	if (i < select1.options.length) {
		select1.selectedIndex = i
		select1.dispatchEvent(new Event("change"))

		setTimeout(() => {
			i++
			changeSelect1()
		}, 10000)
	}
}

changeSelect1()

select1.addEventListener("change", () => {
	console.clear()
	console.log(select1.options.length)
	const selectedValue = select1.value
	const selectedId = select1.options[select1.selectedIndex].id

	let resources = []

	let j = 0

	function changeSelect2() {
		if (j < select2.options.length) {
			select2.selectedIndex = j
			setTimeout(() => {
				select2.dispatchEvent(new Event("change"))
				j++
				changeSelect2()
			}, 100)
		}
	}

	changeSelect2()
	select2.addEventListener("change", () => {
		const selectedValue2 = select2.value
		const selectedName2 = select2.options[select2.selectedIndex].innerText
		const selectedId2 = select2.options[select2.selectedIndex].id

		if (selectedName2.trim() !== "") {
			const existingResource = products[products.length - 1].resources.find(resource => resource.id === selectedId2)
			if (!existingResource) {
				const newResource = {
					id: selectedId2,
					name: selectedName2,
					value: selectedValue2,
					result: document.querySelector(`#${selectedId2.replace("n", "")}`)?.value,
				}

				products[products.length - 1].resources.push(newResource)
				console.log("Новый ресурс добавлен:", select2.selectedIndex + 1, select2.options[select2.selectedIndex].innerText, select2.options[select2.selectedIndex].id)
			} else {
				console.log("Ресурс уже существует:", existingResource)
			}
		}
	})

	const product = {
		id: selectedId,
		name: selectedValue,
		resources: resources,
	}

	products.push(product)

	if (products.length == select1.options.length) {
		console.log("Готово", products)
		console.log("JSON", JSON.stringify(products))
		console.log(products.length)
		console.timeEnd("test")
	} else {
		console.log(products.length)
		console.log(products)
		console.time("test")
	}
})

select1.dispatchEvent(new Event("change"))

fetch("data.json")
	.then(response => response.json())
	.then(data => {
		const select1 = document.getElementById("select1")
		const select2 = document.getElementById("select2")
		const textarea = document.getElementById("textarea")

		data.forEach(item => {
			const option = document.createElement("option")
			option.value = item.name
			option.text = item.name
			select1.appendChild(option)
		})

		select1.value = data[0].name // set select1 to the first option

		const selectedItem = data.find(item => item.name === select1.value)

		selectedItem.resources.forEach(resource => {
			const option = document.createElement("option")
			option.value = resource.name
			option.text = resource.name
			select2.appendChild(option)
		})

		select2.value = selectedItem.resources[0].name // set select2 to the first resource

		const selectedResource = selectedItem.resources.find(resource => resource.name === select2.value)

		textarea.value = selectedResource.result // display the result

		select1.addEventListener("change", () => {
			const selectedValue = select1.value
			const selectedItem = data.find(item => item.name === selectedValue)

			select2.innerHTML = ""

			selectedItem.resources.forEach(resource => {
				const option = document.createElement("option")
				option.value = resource.name
				option.text = resource.name
				select2.appendChild(option)
			})

			const selectedResource = selectedItem.resources.find(resource => resource.name === select2.value)

			textarea.value = selectedResource.result
		})

		select2.addEventListener("change", () => {
			const selectedValue = select2.value
			const selectedResource = selectedItem.resources.find(resource => resource.name === selectedValue)

			textarea.value = selectedResource.result
		})
	})
	.catch(error => console.error("Error loading data:", error))

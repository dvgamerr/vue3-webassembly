package main

import (
	"strconv"
	"syscall/js"
)

func main() {
	println("GO:: Hello world!")
}

//export add
func Add(a, b int) int {
	return a + b
}

//export update
func Update() {
	println("GO::EVENT Update!")

	document := js.Global().Get("document")

	aStr := document.Call("getElementById", "a").Get("value").String()
	bStr := document.Call("getElementById", "b").Get("value").String()
	a, _ := strconv.Atoi(aStr)
	b, _ := strconv.Atoi(bStr)
	result := Add(a, b)
	document.Call("getElementById", "result").Set("value", result)
}

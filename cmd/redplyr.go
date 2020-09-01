/*
Copyright © 2020 NAME HERE <EMAIL ADDRESS>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package cmd

import (
	"fmt"
	"log"
	"time"
	"os"

	"github.com/spf13/cobra"
	"github.com/briandowns/spinner"
	"github.com/imroc/req"
)

// redplyrCmd represents the redplyr command
var redplyrCmd = &cobra.Command{
	Use:   "redplyr",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		// fmt.Println("redplyr called")
		redplyr()
	},
}


func redplyr() {
	fmt.Println("Initalizing ReDPLYR")
	s := spinner.New(spinner.CharSets[11], 100*time.Millisecond)
	s.Start()
	time.Sleep(4 * time.Second)
	
	authHeader := req.Header{
		"Accept":        "application/json",
		"Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImEuZ2FtYWxAZHBseXIuZGV2IiwibmFtZSI6IkFobWVkIiwiaWQiOiI1ZTUxMTVkZDUzM2FlYTAwMDc5MjNhNjciLCJleHAiOjFlKzMwLCJpYXQiOjE1OTc3NDkzNDJ9.X514kWZIu8kKw5M1EhAMk128B7IAt0QBjn97WTXC15Q",
	}
	reqBody := map[string]string{"requestId":"5ee8f13bd210b7a8e52e1572"}
	req, err := req.Post("https://api.dplyr.dev/api/v1/requests/redplyr-zapier", req.BodyJSON(reqBody) ,authHeader)
	if err != nil {
		log.Fatal(err)
	} 
	req.ToString()
	fmt.Println(os.Getenv("PWD"))
	fmt.Println(req.ToString())
	s.Stop()
	fmt.Println(req.Response().Status)
	fmt.Println("ReDPLYR Successful")
}

func init() {
	rootCmd.AddCommand(redplyrCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// redplyrCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// redplyrCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

import { defineStore } from "pinia";

export const usePlanStore = defineStore("planStore", {
    state: () => ({
        plans: [
            {   
                id: 1,
                "year": 2022,
                "arr_plan": [
                  {
                    "division": 6,
                    "arr_chapter": [
                      {
                        "title": 1,
                        "arr_profession": [
                          {
                            "name": 14,
                            "code": [
                              9,
                              10
                            ],
                            "to1": 0,
                            "per": 0,
                            "indt": 0,
                            "tren": 0,
                            "exam": 0,
                            "to2": 0,
                            "po": 0,
                            "start_o": [
                              "2021-11-16",
                              "2021-11-19"
                            ],
                            "start_po": [
                              "2021-02-24",
                              "2021-02-24"
                            ],
                            "end_po": [
                              "2022-03-17",
                              "2022-03-17"
                            ],
                            "qual_ex": [
                              "2022-04-28",
                              "2022-04-28"
                            ],
                            "count_people": 14,
                            "direction": [
                              92
                            ],
                            "count": [
                              14
                            ]
                          },
                          {
                            "name": 17,
                            "code": [
                              18,
                              19,
                              20
                            ],
                            "to1": 0,
                            "per": 0,
                            "indt": 0,
                            "tren": 0,
                            "exam": 0,
                            "to2": 0,
                            "po": 0,
                            "start_o": [
                              "2021-11-16",
                              "2021-11-16",
                              "2021-11-16"
                            ],
                            "start_po": [
                              "2021-02-24",
                              "2021-02-24",
                              "2021-02-24"
                            ],
                            "end_po": [
                              "2022-03-17",
                              "2022-03-17",
                              "2022-03-17"
                            ],
                            "qual_ex": [
                              "2022-04-28",
                              "2022-04-28",
                              "2022-04-28"
                            ],
                            "count_people": 15,
                            "direction": [
                              92,
                              94,
                              90
                            ],
                            "count": [
                              5,
                              7,
                              3
                            ]
                          }
                        ],
                        "arr_profession_results": {
                          "to1": 0,
                          "indt": 0,
                          "tren": 0,
                          "exam": 0,
                          "to2": 0,
                          "po": 0,
                          "count_people": 29,
                          "directions": {
                            "90": 3,
                            "92": 19,
                            "94": 7,
                            "": 0
                          }
                        },
                        "results": true
                      }
                    ],
                    "arr_chapter_results": {
                      "to1": 0,
                      "indt": 0,
                      "tren": 0,
                      "exam": 0,
                      "to2": 0,
                      "po": 0,
                      "count_people": 29,
                      "directions": {
                        "90": 3,
                        "92": 19,
                        "94": 7,
                        "": 0
                      }
                    },
                    "results": true
                  }
                ],
                "arr_plan_result": {
                  "to1": 0,
                  "indt": 0,
                  "tren": 0,
                  "exam": 0,
                  "to2": 0,
                  "po": 0,
                  "count_people": 29,
                  "directions": {
                    "90": 3,
                    "92": 19,
                    "94": 7,
                    "": 0
                  }
                },
                "results": true
            },
            {   
                id: 2,
                "year": 2023,
                "arr_plan": [
                  {
                    "division": 6,
                    "arr_chapter": [
                      {
                        "title": 1,
                        "arr_profession": [
                          {
                            "name": 14,
                            "code": [
                              9,
                              10
                            ],
                            "to1": 0,
                            "per": 0,
                            "indt": 0,
                            "tren": 0,
                            "exam": 0,
                            "to2": 0,
                            "po": 0,
                            "start_o": [
                              "2022-11-16",
                              "2022-11-19"
                            ],
                            "start_po": [
                              "2022-02-24",
                              "2022-02-24"
                            ],
                            "end_po": [
                              "2023-03-17",
                              "2023-03-17"
                            ],
                            "qual_ex": [
                              "2023-04-28",
                              "2023-04-28"
                            ],
                            "count_people": 14,
                            "direction": [
                              92
                            ],
                            "count": [
                              14
                            ]
                          },
                          {
                            "name": 17,
                            "code": [
                              18,
                              19,
                              20
                            ],
                            "to1": 0,
                            "per": 0,
                            "indt": 0,
                            "tren": 0,
                            "exam": 0,
                            "to2": 0,
                            "po": 0,
                            "start_o": [
                              "2022-11-16",
                              "2022-11-16",
                              "2022-11-16"
                            ],
                            "start_po": [
                              "2022-02-24",
                              "2022-02-24",
                              "2022-02-24"
                            ],
                            "end_po": [
                              "2023-03-17",
                              "2023-03-17",
                              "2023-03-17"
                            ],
                            "qual_ex": [
                              "2023-04-28",
                              "2023-04-28",
                              "2023-04-28"
                            ],
                            "count_people": 15,
                            "direction": [
                              92,
                              94,
                              90
                            ],
                            "count": [
                              5,
                              7,
                              3
                            ]
                          }
                        ],
                        "arr_profession_results": {
                          "to1": 0,
                          "indt": 0,
                          "tren": 0,
                          "exam": 0,
                          "to2": 0,
                          "po": 0,
                          "count_people": 29,
                          "directions": {
                            "90": 3,
                            "92": 19,
                            "94": 7,
                            "": 0
                          }
                        },
                        "results": true
                      }
                    ],
                    "arr_chapter_results": {
                      "to1": 0,
                      "indt": 0,
                      "tren": 0,
                      "exam": 0,
                      "to2": 0,
                      "po": 0,
                      "count_people": 29,
                      "directions": {
                        "90": 3,
                        "92": 19,
                        "94": 7,
                        "": 0
                      }
                    },
                    "results": true
                  }
                ],
                "arr_plan_result": {
                  "to1": 0,
                  "indt": 0,
                  "tren": 0,
                  "exam": 0,
                  "to2": 0,
                  "po": 0,
                  "count_people": 29,
                  "directions": {
                    "90": 3,
                    "92": 19,
                    "94": 7,
                    "": 0
                  }
                },
                "results": true
            }
        ],
    }),
});
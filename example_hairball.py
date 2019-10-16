import json

test_chart = {
    "title": "test chart",
    "banner": "test banner",
    "companies": [
        {"ticker":"AAPL", "coords":[0.2, 0.3, 0.4]},
        {"ticker":"AARD", "coords":[-0.2, -0.3, -0.4]}
    ],
    "dates": [
        {"label":"07/12/19", "coords": [0.02, 0.03, 0.04]},
        {"label":"07/13/19", "coords": [-0.2, -0.5, -0.8]}
    ]
}

print(json.dumps(test_chart))
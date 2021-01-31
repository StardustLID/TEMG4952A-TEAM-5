# TEMG4952A - Team 5 Project Methodology

This markdown records the methodology used in this project, including Crunchbase CSV treatment, justification to preprocessing techniques and ML models used, and analysis of the business insights to UBS.

## Crunchbase CSV Treatment

| File Name                      | Remarks                                |
|--------------------------------|----------------------------------------|
| acquisitions                   |                                        |
| <del>category_groups           | duplicate with `organizations.csv`     |
| <del>checksum                  | /                                      |
| degrees                        |                                        |
| event_appearances              |                                        |
| <del>events                    | little useful info                     |
| funding_rounds                 |                                        |
| funds                          |                                        |
| investment_partners            |                                        |
| investments                    |                                        |
| investors                      |                                        |
| ipos                           |                                        |
| jobs                           |                                        |
| org_parents                    |                                        |
| <del>organization_descriptions | too wordy, hard to extract useful info |
| organizations                  | fintech, 2010-1-1 to 2020-12-31 only   |
| people                         |                                        |
| <del>people_descriptions       | too wordy, hard to extract useful info |

---

## Justification to Proprocessing and ML Models

### *Step 1 Filtering out "successful" companies*
| Logistic Regression            | Decision tree                          |
|--------------------------------|----------------------------------------|
| acquisitions                   |                                        |
| <del>category_groups           | duplicate with `organizations.csv`     |
| <del>checksum                  | /                                      |
| degrees                        |                                        |
| event_appearances              |                                        |
| <del>events                    | little useful info                     |
| funding_rounds                 |                                        |
| funds                          |                                        |
| investment_partners            |                                        |
| investments                    |                                        |
| investors                      |                                        |
| ipos                           |                                        |
| jobs                           |                                        |
| org_parents                    |                                        |
| <del>organization_descriptions | too wordy, hard to extract useful info |
| organizations                  | fintech, 2010-1-1 to 2020-12-31 only   |
| people                         |                                        |
| <del>people_descriptions       | too wordy, hard to extract useful info |





## Analysis of Business Insights
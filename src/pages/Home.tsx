"use client"

import React, { useState } from "react"
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
} from "@ionic/react"
import "./Home.css"

const Home: React.FC = () => {
  // Sample match data - in a real app, this would come from an API or state management
  const [matchData, setMatchData] = useState({
    teams: {
      batting: "India",
      bowling: "Australia",
    },
    batters: [
      { name: "Rohit Sharma", runs: 42, balls: 38, fours: 4, sixes: 2, ballByBall: ["1", "4", "0", "6", "1", "2"] },
      { name: "Virat Kohli", runs: 35, balls: 29, fours: 3, sixes: 1, ballByBall: ["0", "1", "4", "1", "1", "6"] },
    ],
    bowler: {
      name: "Pat Cummins",
      overs: 3.2,
      maidens: 0,
      runs: 24,
      wickets: 1,
      economy: 7.2,
      ballByBall: ["1", "W", "0", "4", "1", "2"],
    },
    matchSummary: {
      runs: 87,
      wickets: 1,
      overs: 9.2,
      runRate: 9.32,
      target: 168,
    },
  })

  // Function to render ball-by-ball display with appropriate styling
  const renderBallByBall = (balls: string[]) => {
    return balls.map((ball, index) => {
      let className = "ball-default"

      if (ball === "4") {
        className = "ball-four"
      } else if (ball === "6") {
        className = "ball-six"
      } else if (ball === "W") {
        className = "ball-wicket"
      }

      return (
        <div key={index} className={`ball ${className}`}>
          {ball}
        </div>
      )
    })
  }

  // Function to render delivery icons
  const renderDeliveryIcon = (delivery: string) => {
    if (delivery === "W") {
      return <div className="delivery-icon wicket">W</div>
    } else if (delivery === "0") {
      return <div className="delivery-icon dot">0</div>
    } else if (delivery === "4") {
      return <div className="delivery-icon four">4</div>
    } else if (delivery === "6") {
      return <div className="delivery-icon six">6</div>
    } else {
      return <div className="delivery-icon run">{delivery}</div>
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Live Cricket Score</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Match Header */}
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle className="ion-text-center">T20 World Cup 2023</IonCardSubtitle>
            <IonCardTitle className="ion-text-center">
              {matchData.teams.batting} vs {matchData.teams.bowling}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="teams-container">
              <div className="team">
                <IonBadge color="success">BATTING</IonBadge>
                <span className="team-name">{matchData.teams.batting}</span>
              </div>
              <div className="team">
                <span className="team-name">{matchData.teams.bowling}</span>
                <IonBadge color="tertiary">BOWLING</IonBadge>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Match Summary */}
        <IonCard color="primary">
          <IonCardContent>
            <div className="match-summary">
              <div className="score">
                {matchData.matchSummary.runs}/{matchData.matchSummary.wickets}
              </div>
              <div className="overs">{matchData.matchSummary.overs} Overs</div>
              <div className="rate">
                <div className="label">CRR</div>
                <div className="value">{matchData.matchSummary.runRate}</div>
              </div>
              <div className="target">
                <div className="label">TARGET</div>
                <div className="value">{matchData.matchSummary.target}</div>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Batters Stats */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Batters</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid className="stats-grid">
              <IonRow className="header-row">
                <IonCol size="5">BATTER</IonCol>
                <IonCol size="1" className="ion-text-center">
                  R
                </IonCol>
                <IonCol size="1" className="ion-text-center">
                  B
                </IonCol>
                <IonCol size="1" className="ion-text-center">
                  4s
                </IonCol>
                <IonCol size="1" className="ion-text-center">
                  6s
                </IonCol>
                <IonCol size="3" className="ion-text-center">
                  SR
                </IonCol>
              </IonRow>

              {matchData.batters.map((batter, index) => (
                <React.Fragment key={index}>
                  <IonRow className="batter-row">
                    <IonCol size="5" className="batter-name">
                      {index === 0 && <div className="active-indicator"></div>}
                      {batter.name}
                    </IonCol>
                    <IonCol size="1" className="ion-text-center runs">
                      {batter.runs}
                    </IonCol>
                    <IonCol size="1" className="ion-text-center">
                      {batter.balls}
                    </IonCol>
                    <IonCol size="1" className="ion-text-center">
                      {batter.fours}
                    </IonCol>
                    <IonCol size="1" className="ion-text-center">
                      {batter.sixes}
                    </IonCol>
                    <IonCol size="3" className="ion-text-center">
                      {((batter.runs / batter.balls) * 100).toFixed(1)}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <div className="ball-by-ball-label">BALL BY BALL</div>
                      <div className="ball-by-ball-container">{renderBallByBall(batter.ballByBall)}</div>
                    </IonCol>
                  </IonRow>
                </React.Fragment>
              ))}
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Bowler Stats */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Current Bowler</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid className="stats-grid">
              <IonRow className="header-row">
                <IonCol size="4">BOWLER</IonCol>
                <IonCol size="2" className="ion-text-center">
                  O
                </IonCol>
                <IonCol size="2" className="ion-text-center">
                  M
                </IonCol>
                <IonCol size="2" className="ion-text-center">
                  R
                </IonCol>
                <IonCol size="2" className="ion-text-center">
                  W
                </IonCol>
              </IonRow>
              <IonRow className="bowler-row">
                <IonCol size="4">{matchData.bowler.name}</IonCol>
                <IonCol size="2" className="ion-text-center">
                  {matchData.bowler.overs}
                </IonCol>
                <IonCol size="2" className="ion-text-center">
                  {matchData.bowler.maidens}
                </IonCol>
                <IonCol size="2" className="ion-text-center">
                  {matchData.bowler.runs}
                </IonCol>
                <IonCol size="2" className="ion-text-center wickets">
                  {matchData.bowler.wickets}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <div className="this-over-label">THIS OVER</div>
                  <div className="this-over-container">
                    {matchData.bowler.ballByBall.map((ball, index) => (
                      <div key={index} className="delivery">
                        {renderDeliveryIcon(ball)}
                      </div>
                    ))}
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Home


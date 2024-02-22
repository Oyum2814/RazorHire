import React from "react";
import style from "./Landing.module.scss";

import clsx from "clsx";

import HeroImg from "assets/images/hero.png";
import CompanyBannerImg from "assets/images/companies-banner.png";
import HeroBgLeftImg from "assets/images/hero_bg_left.png";
import HeroBgRightImg from "assets/images/hero_bg_right.png";

import { FEATURES, PREMIUM } from "./Landing.content.js";
import GetStartedBtn from "./GetStartedBtn";

export default function Hero() {
  return (
    <div className={clsx(style.wrapper)}>
      <section className={clsx(style.hero, "withPadding")}>
        <div className={style.bgRight}>
          <img src={HeroBgRightImg} alt="" />
        </div>

        <div className={style.bgLeft}>
          <img src={HeroBgLeftImg} alt="" />
        </div>

        <div className={style.intro}>
          <div className={style.textBox}>
            <div className={style.title}>
              Resume to crack your first tech job <span></span>
            </div>
            <div className={style.subtitle}>
              Build your brand-new resume in as little as 5 minutes.
            </div>
            <div className={style.button}>
              <GetStartedBtn />
            </div>
          </div>

          <div className={style.image}>
            <img src={HeroImg} alt="hero" />
          </div>
        </div>

        <div className={style.clientelle}>
          <div className={style.caption}>
            Secure your dream tech job swiftly with our specialized fresher
            resume builder
          </div>
          <div className={style.subCaption}>
            Get hired in top companies like
          </div>
          <img src={CompanyBannerImg} alt="client list" />
        </div>
      </section>

      <section className={clsx(style.featuresSection, "withPadding")}>
        <div className={style.caption}>
          <p>Features designed to help you win your dream job</p>
        </div>
        <div className={style.features}>
          {FEATURES.map((feat, index) => (
            <article key={index}>
              <div className={style.image}>
                <img src={feat.icon} alt="icon" />
              </div>
              <div className={style.text}>
                <div className={style.title}>{feat.title}</div>
                <div className={style.body}>{feat.body}</div>
              </div>
            </article>
          ))}
        </div>
        <div className={style.button}>
          <GetStartedBtn />
        </div>
      </section>

      <section className={clsx(style.premiumSection, "withPadding")}>
        <div className={style.caption}>
          <p>Premimum Resume Templates</p>
        </div>
        <div className={style.premiums}>
          {PREMIUM.map((prem, index) => (
            <article key={index}>
              <div className={style.image}>
                <img src={prem.templateImg} alt="resume template" />
              </div>
              <div className={style.title}>{prem.title}</div>
              <div className={style.body}>{prem.body}</div>
            </article>
          ))}
        </div>

        <div className={style.button}>
          <GetStartedBtn />
        </div>
      </section>
    </div>
  );
}

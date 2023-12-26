<template>
  <div class="video-div">
    <video controls autoPlay crossorigin="anonymus">
      <source
        src="http://localhost:5000/video/6586a41f4c05f7c32a067141"
        type="video/mp4"
      />
    </video>
    <article class="info">
      <h2>Description</h2>
      <p class="title">
        Title of the video is this nonononononononononononononono
      </p>
      <div class="detail">
        <p><span>Likes</span> <span>0</span></p>
        <p><span>Uploaded</span> <span>20 June 2021</span></p>
        <p><span>Creator</span> <span>Username</span></p>
      </div>
      <LongText class="desc-box">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
        praesentium non numquam exercitationem, voluptates aliquid eveniet,
        eligendi, vero voluptatibus quam atque. Iusto ipsa atque repellat
        ducimus ullam unde laborum consectetur enim ex officia, hic eaque at
        incidunt veritatis aperiam sequi voluptas. Autem facilis sunt rem
        tempore ipsum non molestias! Aperiam dolorem soluta eius, ipsa
        consequuntur saepe aliquam ratione cupiditate fugit ipsam deleniti
        minima dolore eveniet cumque. Dolorum dignissimos exercitationem sit
        pariatur iste provident neque? Nulla ipsam labore maxime laudantium
        autem quo eos quasi iste! Ipsa beatae, alias quibusdam saepe ullam sequi
        porro animi aut aliquam dolore quas omnis quaerat recusandae, quo
        ratione aperiam corrupti error debitis doloribus quod maxime explicabo
        vero similique. Voluptatum a minima asperiores soluta nisi non dolores
        omnis autem, consequuntur quia tempora temporibus repellat tenetur sed
        accusamus accusantium similique minus sunt eum officiis. Doloremque
        magnam amet quibusdam magni sit ipsa nemo molestiae ipsum, recusandae
        vel similique aut quis quae nisi ut obcaecati blanditiis iusto, id
        facere distinctio iure nihil porro. Aut provident expedita voluptatum
        dolores ullam non porro ipsam sint natus molestias officia sed
        consequatur voluptatem voluptas dolore, omnis autem assumenda culpa
        modi, delectus facere molestiae aliquid est eveniet? Quia reiciendis
        ipsum saepe autem obcaecati, delectus molestias.
      </LongText>

      <!-- <img src="/temp/profile.png" /> -->
      <UserCard user-img="/temp/profile.png"> Username </UserCard>
    </article>
  </div>
</template>

<style scoped>
.video-div {
  text-align: center;
}

video {
  /* width is bigger  */

  width: calc(100svw - 12px);
  height: 56.25svw;
}
@media (min-width: 177.76svh) {
  video {
    /* height is bigger  */
    width: calc (177.76svh - 12px);
    height: 99.99svh;
  }
}
.info label {
  display: inline;

  background-color: #00acff;

  font-size: 0.8em;
}

.info {
  padding: 16px;
}
.info .detail {
  display: flex;
  justify-content: space-around;
  gap: 0 2rem;
  flex-grow: 1;
  flex-wrap: wrap;
}
.info input:checked ~ label {
  display: none;
}
.info input {
  display: none;
}
.info input:checked + .desc p {
  -webkit-line-clamp: unset;
}
.desc p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.info div p {
  display: flex;
  flex-direction: column;
}
.info div p span:first-child {
  font-weight: bold;
  color: rgb(53, 47, 47);
  font-size: 1.1rem;
}
.info div p span:last-child {
  color: rgb(85, 82, 82);
  font-weight: 100;
  font-size: 0.6rem;
}
.desc-box,
.info h2,
.title {
  text-align: left;
  word-wrap: break-word;
}
.desc-box {
}
.desc-box {
  font-size: 0.7rem;
  line-height: 1.1rem;
  background-color: rgba(214, 211, 211, 0.57);
  border-radius: 10px;
  padding: 1rem 0.5rem;
}
</style>

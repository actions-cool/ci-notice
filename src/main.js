const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require('@actions/exec');
const { Octokit } = require('@octokit/rest');
const axios = require('axios');

const token = core.getInput('token');
const octokit = new Octokit({ auth: `token ${token}` });
const context = github.context;
const { dealStringToArr } = require('actions-util');

async function run() {
  try {
    if (context.eventName !== 'pull_request_target') {
      const { owner, repo } = context.repo;
      core.info(`owner: ${owner}, repo: ${repo}`);
      const cis = core.getInput('ci').split('\n');
      try {
        for (const ci of cis) {
          core.info(`[Run] ${ci}`);
          await exec(ci);
        }
        core.setOutput('result', 'success');
      } catch (err) {
        const noticeTypes = dealStringToArr(core.getInput('notice-types'));
        const noticeTitle = core.getInput('notice-title') || `🤖 ${owner}/${repo} CI Notice`;
        const noticeBody =
          core.getInput('notice-body') ||
          '🚨 CI run failed, please check in time!\n\n```' + `\n${core.getInput('ci')}\n` + '```';

        for (let noticeType of noticeTypes) {
          if (noticeType === 'dingding') {
            const dingdingToken = core.getInput('dingding-token');
            axios.post(`https://oapi.dingtalk.com/robot/send?access_token=${dingdingToken}`, {
              msgtype: 'markdown',
              markdown: {
                title: noticeTitle,
                text: `[#${noticeTitle}](https://github.com/${owner}/${repo})\n\n${noticeBody}`,
              },
            });
          }

          if (noticeType === 'issue') {
            const labels = core.getInput('issue-labels');
            const assignees = core.getInput('issue-assignees');

            const params = {
              owner,
              repo,
              title: noticeTitle,
              body: noticeBody,
              labels: dealStringToArr(labels),
              assignees: dealStringToArr(assignees),
            };
            const { data } = await octokit.issues.create(params);
            core.info(`Actions: [create-issue][${data.number}] success!`);
          }
        }

        core.setOutput('result', 'failed');
      }
    } else {
      core.setFailed(`This Action is not support "pull_request_target"!`);
    }
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
